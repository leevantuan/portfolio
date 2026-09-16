# Backend API Rules

## Routing style

Carter (`ICarterModule`) là pattern chiếm ưu thế cho project mới (Device, Ops, ZKTime, Face,
TaskFlow) — module implement `ICarterModule`, map route trong `AddRoutes(IEndpointRouteBuilder)`,
gọi `ISender.Send(...)` (nếu có MediatR) hoặc service trực tiếp, convert `Result`/exception thành
`IResult`. Không dùng `[ApiController]`/`ControllerBase` — không có project nào trong workspace dùng
MVC Controller cho API mới.

CIO và CSR dùng minimal API thuần (`app.MapGroup(...).MapGet/MapPost(...)`) không qua Carter — hợp
lệ, không bắt buộc chuyển sang Carter nếu không được yêu cầu.

```csharp
// Carter module — pattern chuẩn (Device/Ops/ZKTime/Face)
public sealed class DeviceApi : ApiEndpoint, ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        var group = app.NewVersionedApi("devices").MapGroup(BaseUrl).HasApiVersion(1).RequireAuthorization();
        group.MapPost("", CreateDeviceV1).RequireJwtAuthorize(Permission.Create);
    }
}
```

## Versioning

Route có version: `/api/v{version}/<resource>` (vd `/api/v1/devices`). Dùng
`app.NewVersionedApi(...).MapGroup(...).HasApiVersion(1)`.

## Health & smoke-test endpoint

- `GET /health/live`, `GET /health/ready` — health check chuẩn.
- `GET /api/v1/ping` → 200 "pong" — smoke-test convention thấy ở Face, hữu ích để verify deploy
  nhanh.

## Auth — kiểm tra từng route, không chỉ group

`RequireAuthorization()` đặt ở group **không đảm bảo** mọi route con đều được bảo vệ — bug thật đã
xảy ra ở Ops: mọi route trong `DepartmentApi.cs` gắn thêm `.AllowAnonymous()` phía sau
`.RequireAuthorization()` ở group, vô hiệu hoá auth toàn bộ. Khi thêm route mới vào một group đã có
`RequireAuthorization()`, không copy-paste `.AllowAnonymous()` từ route khác mà không hiểu tại sao nó
ở đó.

## Swagger

Chỉ bật ở Development. Không public ở Production (vi phạm đã thấy ở ZKTime).

## CORS

Whitelist domain cụ thể, không `AllowAnyOrigin()`. Chi tiết đầy đủ: [[security]].
