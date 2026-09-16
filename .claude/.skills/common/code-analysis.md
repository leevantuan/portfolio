# Code Analysis Skill

## Mục đích

Phân tích codebase để tìm file liên quan, trace luồng dữ liệu, xác định component bị ảnh hưởng —
trước khi sửa code. Cách trace khác nhau theo layering của project (xem `memory.md` để biết project
nào dùng pattern nào).

## Trace theo Clean Architecture (Device, Ops, ZKTime, Face)

Thứ tự trace 1 request từ ngoài vào trong:

1. **Presentation** — tìm Carter module map route (`*Api.cs`, tìm bằng route string hoặc tên
   resource) → xác định handler nào được gọi qua `ISender.Send(...)`.
2. **Contract** — tìm `Command`/`Query` type tương ứng trong `Contract/Services/V1/<Resource>/` +
   `Result`/`Error` shape sẽ trả về.
3. **Application** — tìm `<Resource>CommandHandler`/`QueryHandler` trong
   `Application/UseCases/V1/{Commands,Queries}/` — đây là nơi chứa business logic thật.
4. **Pipeline behaviors** — kiểm tra `Application/Behaviors/` (Validation/Transaction/Performance/
   Tracing) — code cross-cutting (validate, commit transaction, log) chạy ở đây, không nằm trong
   handler.
5. **Domain** — entity liên quan trong `Domain/Entities/`.
6. **Persistence** — `Configurations/` (EF fluent config, index, filtered unique index),
   `Repositories/`, `Migrations/` (lịch sử schema thật).
7. **Infrastructure** — nếu handler gọi ra hệ thống ngoài (device, email, HTTP client bên thứ 3).

## Trace theo pattern đơn giản (CIO, CSR, TaskFlow)

Không có Application/Contract riêng cho CQRS — trace ngắn hơn: **Endpoint** (`*Endpoints.cs`, gọi
trực tiếp interface service) → **Service** (BLL, chứa business logic + gọi DbContext trực tiếp) →
**DbContext/Entity** (DAT). TaskFlow là ngoại lệ: business logic thật nằm ở tầng Persistence (không
phải Application) — kiểm tra kỹ trước khi giả định theo layering chuẩn.

## Xác định phạm vi ảnh hưởng

- Trước khi sửa 1 entity/DTO, grep toàn bộ chỗ dùng nó (Request/Response/mapping) — không chỉ sửa
  chỗ thấy đầu tiên.
- Trước khi sửa 1 API contract, kiểm tra cả FE có gọi endpoint đó không (service HTTP wrapper trong
  `core/services/`), tránh phá contract mà không cập nhật phía gọi.
- Khi không chắc project dùng pattern nào, đọc `.csproj` `ProjectReference` thật thay vì suy đoán từ
  tên thư mục.
