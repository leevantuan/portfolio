# memory.md — Tri thức dài hạn

## Pattern chung đã xác nhận

- `Result` / `Result<T>` tại `<Project>.Contract/Abstractions/Shared/Result.cs` — trả về từ mọi
  command/query handler (CIO, CSR, Device, Ops, ZKTime, Face đều có; TaskFlow không có).
- `AsNoTracking()` cho mọi read query.
- Migration áp dụng thủ công (`dotnet ef database update`), không auto-migrate lúc startup — trừ
  TaskFlow áp dụng cách tốt hơn: check pending migration lúc startup, **fail-fast** nếu còn thiếu
  (không tự Migrate()). Đây là pattern nên nhân rộng.
- Filtered unique index (`HasFilter`) làm cơ chế chống trùng/chống race condition ở tầng DB — không
  chỉ check ở tầng ứng dụng (Ops, ZKTime, Face, TaskFlow).
- 100% Angular standalone component, không NgModule nào trong toàn bộ 7 FE.
- `ngx-toastr` có mặt ở 6/7 FE (trừ TaskFlow).

## Bad pattern đã audit — đừng lặp lại ở code mới

Tổng hợp từ PROJECT_AUDIT.md (CIO), review_pj.md + PHASE1 doc (Device), BACKEND_ARCHITECTURE_ANALYSIS.md
(Ops), ARCHITECTURE.md + FINAL_PROJECT_AUDIT/REAUDIT (ZKTime). Chi tiết + rule sửa: [[security]],
[[backend/database]], [[backend/error-handling]].

- CORS `AllowAnyOrigin()`/`SetIsOriginAllowed(_ => true)` — CIO, Device, Ops, ZKTime.
- JWT `ValidateIssuer`/`ValidateAudience` = false — Device, ZKTime.
- `.AllowAnonymous()` gắn sau group `.RequireAuthorization()`, vô hiệu hoá auth toàn bộ nhóm route —
  Ops (bug thật, không phải style).
- SQL injection risk: nối giá trị search chưa escape vào `FromSqlRaw` (Device), nội suy **tên cột**
  filter/sort vào raw SQL không whitelist (ZKTime).
- `EnableSensitiveDataLogging()` + `EnableDetailedErrors()` bật vô điều kiện mọi environment —
  Device, ZKTime.
- `UseLazyLoadingProxies(true)` → rủi ro N+1 ẩn — Device, ZKTime.
- Secret thật (JWT key, DB password, SMTP, DingTalk...) commit thẳng vào `appsettings*.json` —
  gần như mọi project. Không tự ý xoá/rotate — xem [[security]].
- Swagger UI public trong Production — ZKTime.
- Seeded admin credential nằm trong config, endpoint seed/diagnostics không yêu cầu auth — CIO.
- Doc kiến trúc tự nhận đã làm (RFC7807 ProblemDetails, CorrelationId) nhưng code thực tế không có —
  Ops. Bài học: đừng tin tài liệu mà không grep xác nhận code thật.
- FE: 2 project (Device, TaskFlow) có script `npm test` nhưng **không có test target nào đăng ký**
  trong `angular.json` — script sẽ fail nếu chạy. Đây là nợ kỹ thuật cần biết trước khi báo "tests pass".

## Ghi chú vận hành

- Không phải mọi project đều có CLAUDE.md riêng — chỉ Face và TaskFlow có (xem `[[reference]]` ở
  workspace root `CLAUDE.md`). Khi làm việc bên trong Face/ hoặc TaskFlow/, ưu tiên đọc CLAUDE.md của
  chính project đó trước, vì nó chi tiết hơn Core này về domain nghiệp vụ.
- `.rules/` file trước khi audit này chỉ là khung sườn placeholder ("NOTE" mô tả sẽ chứa gì) — giờ đã
  có nội dung thật, nhưng vẫn nên coi là điểm khởi đầu, cập nhật tiếp khi phát hiện thêm bằng chứng
  mới từ code thật (không phải từ suy đoán).
