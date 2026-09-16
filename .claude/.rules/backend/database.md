# Backend Database Rules

## Migration — áp dụng thủ công, không auto-migrate lúc startup

Không project nào trong workspace gọi `Database.Migrate()`/`EnsureCreated()` lúc startup (đã grep
xác nhận ở CIO, CSR, Device, Ops, ZKTime, Face — code migration-at-startup đều bị comment out có chủ
đích). Migration áp dụng thủ công: `dotnet ef migrations add <Name> --project <Persistence>
--startup-project <Api> --output-dir Migrations` rồi `dotnet ef database update`.

**Pattern tốt nhất đã thấy** (TaskFlow, nên nhân rộng): lúc startup, kiểm tra
`GetPendingMigrationsAsync()` — nếu còn migration chưa áp dụng, log Critical và **từ chối khởi
động** (throw), thay vì tự động Migrate() hoặc âm thầm chạy với schema lệch. Đây là fail-fast, an
toàn hơn cả 2 thái cực (auto-migrate ngầm, hoặc không kiểm tra gì).

## Query

- `AsNoTracking()` bắt buộc cho mọi read-only query (đã là convention nhất quán ở cả 7 project).
- Chỉ dùng `.AsTracking()` khi entity sẽ bị mutate trong cùng unit of work (vd `FindByIdAsync` dùng
  để update).
- Không `UseLazyLoadingProxies(true)` — che giấu N+1 query, đã xác nhận là vấn đề thật ở Device/
  ZKTime (kết hợp navigation property `virtual` + lazy loading proxy). Dùng `.Include()`/projection
  tường minh thay thế.

## Retry / resilience

`EnableRetryOnFailure(...)` hoặc `SqlServerRetryingExecutionStrategy` cấu hình ở tầng Persistence
(convention đã có ở Device, Ops, ZKTime, Face, TaskFlow). Khi cần transaction thủ công cùng với retry
strategy, **phải** bọc trong `Database.CreateExecutionStrategy().ExecuteAsync(...)` — không kết hợp
`BeginTransaction()` thủ công trực tiếp với `EnableRetryOnFailure` (đây là lỗi cổ điển EF Core: retry
sẽ không hoạt động đúng nếu transaction không nằm trong execution strategy). TaskFlow's
`TaskService.cs` làm đúng pattern này khi cần.

## Concurrency / uniqueness invariant

Invariant quan trọng (chống double-submit, double-redemption...) phải được enforce bằng **filtered
unique index ở tầng DB** (`HasFilter("[IsDeleted] = 0")` hoặc tương đương), không chỉ check ở tầng
ứng dụng trước khi insert — check tầng ứng dụng có race condition giữa 2 request đồng thời. Đã dùng
đúng ở Ops, ZKTime, Face, TaskFlow. Phải verify bằng test race condition thật (2 request đồng thời,
SQL Server thật — xem [[testing]]), không chỉ test tuần tự.

## Sensitive/detailed logging

Không `EnableSensitiveDataLogging()`/`EnableDetailedErrors()` bật vô điều kiện mọi environment (vi
phạm đã thấy ở Device, ZKTime) — nếu thật sự cần cho debug, gate theo environment và tắt mặc định.

## Raw SQL

Không nội suy giá trị filter/search chưa escape vào `FromSqlRaw` (lỗ hổng SQL injection thật đã thấy
ở Device's `SqlPagedFilterSortBuilder`). Không nội suy **tên cột** sort/filter vào raw SQL mà không
whitelist trước (lỗ hổng thật ở ZKTime's `AttendanceQuerySqlBuilder` — giá trị được escape nhưng tên
cột thì không). Luôn parameterize giá trị, luôn whitelist tên cột cho phép.

## Index cho cột FK / cột hay lọc-join-sort

Mọi cột khoá ngoại (FK) và mọi cột thường xuyên xuất hiện trong `WHERE`/`JOIN`/`ORDER BY` phải có
index — đây không phải tối ưu tuỳ chọn, thiếu index ở các cột này là nguyên nhân phổ biến gây chậm
khi dữ liệu lớn dần (đã từng phải bổ sung index bù cho các cột FK bị bỏ sót bằng 1 migration riêng
sau khi phát hiện qua audit performance). Khi thêm entity/relationship mới hoặc thêm cột dùng để
filter/sort ở API list, tạo index cho cột đó ngay trong cùng migration — không để lại làm sau.

## Dữ liệu nhị phân lớn

Ảnh, file lớn: chỉ lưu đường dẫn (path) trong DB, không nhúng blob trực tiếp vào cột DB (pattern đúng
ở Face, cho ảnh khuôn mặt).
