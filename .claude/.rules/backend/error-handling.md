# Backend Error Handling Rules

## Result pattern

`Result`/`Result<T>` tại `<Project>.Contract/Abstractions/Shared/` — trả về từ mọi command/query
handler khi project đã theo pattern này (CIO, CSR, Device, Ops, ZKTime, Face). TaskFlow không có
`Result` type — dùng exception + middleware trực tiếp; đây là lựa chọn hợp lệ của TaskFlow, không
tự ý thêm `Result<T>` vào đó nếu không được yêu cầu.

## Vấn đề đã xác nhận thật ở nhiều project — tránh lặp lại

Ở CIO, CSR, Device: service khai báo trả `Result<T>`, nhưng bên trong khi gặp lỗi nghiệp vụ dự kiến
được (not-found, invalid input...) lại **throw exception** (`KeyNotFoundException`,
`ArgumentException`) thay vì trả `Result.Failure(new Error(...))`. Hệ quả: 2 con đường lỗi khác nhau
tồn tại song song trong cùng codebase, dễ gây bug khi caller chỉ check `result.IsFailure` mà không
biết exception cũng có thể ném ra.

**Quy tắc cho code mới**: nếu handler khai báo trả `Result<T>`, lỗi nghiệp vụ dự kiến được (not
found, validation, conflict...) phải trả `Result.Failure(...)`, không throw. Throw chỉ dành cho lỗi
hệ thống thật sự không lường trước (mất kết nối DB, bug logic...).

## Response body — chỉ 1 hình dạng, không 2

Đã xác nhận nhiều project có **2 hình dạng JSON lỗi khác nhau** cùng tồn tại: đường Result→
`HandleFailure` tạo ra `ProblemDetails` thật, còn đường exception→`ExceptionHandlingMiddleware` tạo
ra object JSON tự chế (title/status/detail dạng anonymous object, không phải kiểu
`Microsoft.AspNetCore.Mvc.ProblemDetails`). Với code mới hoặc khi được yêu cầu sửa: thống nhất về
1 hình dạng — khuyến nghị dùng `ProblemDetails` (RFC 7807) thật cho cả 2 đường.

```csharp
// Presentation/Abstractions/ApiEndpoint.cs — pattern chuẩn (Face, Device, Ops, ZKTime)
protected static IResult HandleFailure(Result result) =>
    result switch
    {
        { IsSuccess: true } => throw new InvalidOperationException(),
        IValidationResult validationResult => Results.UnprocessableEntity(new ProblemDetails { ... }),
        _ => Results.BadRequest(new ProblemDetails { ... })
    };
```

## Ranh giới exception hạ tầng

Exception đặc thù hạ tầng (`SqlException` với mã lỗi cụ thể như 2601/2627 cho unique constraint
violation) phải được bắt và convert thành domain exception **ngay tại Persistence** (vd trong
`UnitOfWork.SaveChangesAsync`), không để lộ `SqlException`/kiểu của `Microsoft.Data.SqlClient` lên
Application/Presentation. Xem thêm [[architecture]].

## Middleware toàn cục

Một `ExceptionHandlingMiddleware` duy nhất bắt exception không mong đợi, map từng loại exception →
HTTP status code (`BadRequestException`→400, `NotFoundException`→404, `UnauthorizedException`→401,
`ForbiddenException`→403...), log lại (không log secret — xem [[backend/logging]]), trả về body dạng
`ProblemDetails`.

## Auth bị vô hiệu hoá ngầm

Khi trả lỗi 401/403, xác nhận route thực sự có yêu cầu auth đúng như group khai báo — không có
`.AllowAnonymous()` lạc phía sau (xem [[backend/api.md]]).
