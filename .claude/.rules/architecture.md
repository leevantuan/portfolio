# Architecture Rules

## Pattern target cho backend mới: Clean Architecture + MediatR + Carter

Đã xác nhận thật (không phải lý thuyết) ở 4/7 backend: Device, Ops, ZKTime, Face — Face là bản đầy
đủ và đúng nhất, dùng làm mẫu tham chiếu. Chain phụ thuộc (theo `ProjectReference` thật):

```
Domain  ←  Contract  ←  Application  ←  { Infrastructure, Persistence }  ←  Presentation  ←  Api
                                                                                    (+ Worker riêng)
```

- **Domain**: entity thuần, exception domain. Không reference project nào khác.
- **Contract**: `ICommand`/`IQuery`/`ICommandHandler`/`IQueryHandler`, `Result`/`Result<T>`, DTO
  Request/Response. Chỉ reference Domain.
- **Application**: MediatR handler (`UseCases/V1/{Commands,Queries}/...`), pipeline behaviors
  (Validation, Transaction, Performance, Tracing — xem [[backend/performance]], [[backend/logging]]).
  Chỉ reference Contract (+ Domain gián tiếp).
- **Infrastructure**: adapter hệ thống ngoài (device SDK, HTTP client bên thứ 3, email...).
- **Persistence**: EF Core (`DbContext`, `Configurations`, `Migrations`, `Repositories`,
  `UnitOfWork`).
- **Presentation**: Carter module (`ICarterModule`), chỉ map route → gọi `ISender.Send(...)` → convert
  `Result` thành `IResult`. Không chứa business logic.
- **Api**: composition root — DI wiring, middleware pipeline, `Program.cs`. Không chứa logic.
- **Worker** (khi có — ZKTime, Face): project riêng cho `BackgroundService`/`IHostedService`, không
  chung host với Api.

## Ranh giới không được vi phạm

Kiểu đặc thù hạ tầng (`SqlException`, `Microsoft.Data.SqlClient`, HTTP client cụ thể...) **không được
lộ ra khỏi Persistence/Infrastructure** vào Application/Domain/Presentation. Case chuẩn (Face):
`UnitOfWork.SaveChangesAsync` bắt `SqlException` (mã lỗi 2601/2627) và convert thành
`UniqueConstraintViolationException` (domain exception) ngay tại biên Persistence — Application chỉ
thấy exception domain, không bao giờ thấy `SqlException`.

Vi phạm đã tìm thấy thật (case tiêu cực, không phải mẫu): `Device`'s `JwtAuthorizeAttribute.cs` nằm
trong Application nhưng reference `Microsoft.AspNetCore.Mvc`/`HttpContext` — đây là concern của
Infrastructure/Presentation bị đặt sai layer. Khi review thấy pattern tương tự, coi là bug kiến trúc
cần sửa, không phải style.

## Pattern đơn giản hơn — vẫn hợp lệ, không bắt buộc đổi

CIO, CSR: API/Endpoint → Service (BLL) → DbContext (DAT) trực tiếp, không CQRS/MediatR, không Carter.
TaskFlow: có Carter nhưng không MediatR/Result — business logic nằm ở tầng Persistence (lệch so với
tên gọi, nhưng là hiện trạng thật, không tự ý "sửa cho đúng" nếu không ai yêu cầu).

Đây là 3 project dùng pattern đơn giản hơn, hợp lệ tại thời điểm viết. **Không tự ý migrate 1 project
đơn giản sang Clean Architecture đầy đủ** trừ khi user yêu cầu — đó là thay đổi kiến trúc lớn, thuộc
phạm vi Scope Discipline.

## Frontend — 3 lớp

Core Service / Page-level Service / Component + signal cho state — convention mirror từ ZKTime sang
Face. Service cross-cutting đặt tên nhất quán giữa các project: `HttpClientService`,
`SessionStorageService`, `ToastService`, và một `BaseResponseModel` chung hình dạng response — mỗi
project vẫn giữ token màu/theme riêng của mình.

## Device/protocol integration

Code giao tiếp thiết bị/protocol đặc thù (vd Hikvision ISAPI, RFC 2617 Digest auth) phải nằm sau một
interface (`IIsapiClient` kiểu Face) + `DelegatingHandler` riêng cho phần auth protocol — không để
logic protocol-specific rò vào Application/Domain.
