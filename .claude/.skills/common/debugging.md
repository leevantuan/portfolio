# Debugging Skill

## Mục đích

Điều tra lỗi, thu thập bằng chứng, tìm root cause, đề xuất và kiểm chứng fix — không đoán, không tự
ý sửa trước khi hiểu rõ nguyên nhân.

## Đọc log

- Project dùng Serilog (Device, Ops, ZKTime, Face): kiểm tra section `Serilog` trong
  `appsettings.json` để biết sink nào đang active (Console/File) trước khi đi tìm log ở nơi không tồn
  tại — case thật: Ops có `UseSerilog()` trong code nhưng không có config section, nên log chạy theo
  default ngầm định, không phải cấu hình tưởng như đã document.
- Project dùng `ILogger<T>` thuần (CIO, CSR, TaskFlow): log ra Console/Debug output mặc định của
  .NET, không có file sink trừ khi cấu hình riêng.
- Không log/in ra secret khi debug — xem [[security]] và [[backend/logging]].

## Lỗi thường gặp theo layer

- **401/403 dù đã có `[Authorize]`/`RequireAuthorization()`**: kiểm tra route cụ thể có bị
  `.AllowAnonymous()` đè phía sau không (bug thật đã xảy ra ở Ops).
- **Lỗi lộ ra 2 hình dạng JSON khác nhau** giữa các API: kiểm tra request đó đi qua đường
  Result→`HandleFailure` hay đường exception→`ExceptionHandlingMiddleware` — 2 project (CIO, Device,
  Ops, ZKTime) có cả 2 đường cùng tồn tại, dễ nhầm lẫn khi debug FE nhận response.
- **Deadlock/timeout SQL Server**: kiểm tra `SqlServerRetryOptions`/`EnableRetryOnFailure` đã cấu
  hình đúng mã lỗi transient chưa; nếu có transaction thủ công, xác nhận nó nằm trong
  `CreateExecutionStrategy().ExecuteAsync(...)`, không phải `BeginTransaction()` trần (xem
  [[backend/database]]).
- **N+1 query chậm bất thường**: kiểm tra có `UseLazyLoadingProxies` bật kèm navigation property
  `virtual` không (Device, ZKTime có pattern này).
- **HTTPS/reverse proxy (IIS/Kestrel)**: một số project chủ động comment out
  `app.UseHttpsRedirection()` vì TLS terminate ở reverse proxy phía trước — đừng vội "sửa" lại nếu
  đó là chủ đích, kiểm tra comment/doc trước khi đổi.

## Frontend

- Mở tab Network của DevTools trước, không đoán response shape.
- Hầu hết project (6/7, trừ TaskFlow) dùng 1 HTTP wrapper service tự viết (không phải
  `HttpInterceptor`) để gắn token + xử lý lỗi + gọi toast — lỗi hiển thị sai thường nằm trong
  `handleResponse`/`catchError` của service này (`core/services/httpClient` hoặc
  `https/api-client`), không phải trong component.
- TaskFlow là ngoại lệ, dùng `HttpInterceptorFn` chuẩn Angular — kiểm tra
  `core/auth.interceptor.ts` thay vì tìm wrapper service.

## Trước khi kết luận root cause

Phân biệt rõ "đã xác nhận trực tiếp bằng code/log/DB" và "suy đoán từ hành vi" — chỉ báo là root
cause đã xác nhận khi có bằng chứng trực tiếp (xem [[researcher]]).
