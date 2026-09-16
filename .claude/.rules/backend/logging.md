# Backend Logging Rules

## Serilog là target pattern

Serilog (`Serilog.AspNetCore` + sink Console/File) là pattern của các project mới hơn: Device, Ops,
ZKTime, Face. CIO, CSR, TaskFlow vẫn dùng `ILogger<T>` mặc định của .NET — hợp lệ, không bắt buộc
thêm Serilog nếu không được yêu cầu.

Khi dùng Serilog, đảm bảo section `"Serilog"` trong `appsettings.json` thật sự tồn tại (khai báo
sink, minimum level) — đã xác nhận ở Ops: code có `builder.Host.UseSerilog()` nhưng
`appsettings.json` không có section `Serilog` nào, nên chạy với default ngầm định, không phải cấu
hình đã document. Trước khi khẳng định "project X dùng Serilog với rolling file sink", grep xác nhận
section config thật có tồn tại.

## Structured logging qua pipeline behavior, không rải rác trong handler

Ở project có MediatR pipeline, logging/tracing nên implement thành 1 behavior riêng (`Tracing`
pipeline behavior, chạy cho mọi command/query) thay vì gọi `logger.LogInformation(...)` rải rác
trong từng handler — pattern này đã có ở Face.

## Không bao giờ log

- Secret, credential, connection string, JWT token, API key.
- Dữ liệu sinh trắc học thô (ảnh khuôn mặt, embedding vector) hay PII nhạy cảm khác — chỉ log ID
  tham chiếu, không log payload.
- Giá trị field nhạy cảm khi report tình trạng config — chỉ báo tên field + trạng thái
  Configured/Missing (xem [[security]]).

## Correlation ID — chưa có, không phải quy ước đang tồn tại

Không project nào trong workspace có middleware correlation-ID/request-tracing (đã grep xác nhận 0
hit ở cả 7 project). Nếu được yêu cầu thêm, đây là cải tiến mới, không phải "khôi phục lại convention
đã có" — thiết kế từ đầu, không giả định đã có sẵn hạ tầng để hook vào.
