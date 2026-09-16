# Permission / Authorization Skill

## Mục đích

Pattern phân quyền (RBAC dạng bitmask) chuẩn nhất đang có trong workspace — đúc kết từ 3 project có
hệ phân quyền dùng thật: Ops, Device, TaskFlow. TaskFlow là bản đầy đủ và nhất quán nhất (backend +
frontend đều hoạt động, không có enforcement path trùng lặp), dùng làm mẫu chính; Ops có phần admin
query mạnh hơn ở khoản matrix; Device là bản yếu nhất trong 3 (không có FE enforcement, còn sót enum
chết). Khi implement phân quyền cho 1 project bất kỳ trong workspace, theo pattern này trừ khi
project đó đã có sẵn cơ chế khác đang chạy ổn định — không tự ý thay hệ thống cũ.

## Mô hình dữ liệu

- **Subject có quyền**: `Role`, `User` (có `RoleId`), tuỳ chọn thêm `Department` như 1 chiều scope
  thứ hai.
- **Resource/module**: 1 bảng `Function`/`SystemFunction` dạng cây phân cấp (`Key`, `Name`, `Url`,
  `ParentId`) — `Key` là chuỗi định danh module (vd `"TEAMS"`, `"ADMIN/DOCUMENTS"`), dùng làm
  `ClaimType`.
- **Bảng claim**: `RoleClaim`/`UserClaim`/`DepartmentClaim`, cùng 1 hình dạng
  `(SubjectId, ClaimType: string, ClaimValue: int)` — `ClaimValue` là **bitmask** các action được
  phép trên module đó. Unique index trên `(SubjectId, ClaimType)`.
- Permission = tổ hợp `(ClaimType = resource key)` × `(ClaimValue = bitmask hành động)` trên các
  bảng Role/User/(Department) Claim — không phải 1 dòng riêng cho từng action, không phải chuỗi
  permission phẳng dạng `"teams.read"`.

## Permission action bitmask

Enum hành động cố định theo bit position, ví dụ tối thiểu: `Access=0, Create=1, Read=2, Update=3,
Delete=4`; có thể mở rộng thêm domain-specific verb khi nghiệp vụ cần (vd `Accept`, `Complete`,
`Return`, `Configure` — `Configure` hoặc mask full-bit được coi là "toàn quyền" trên module đó).

Check quyền luôn là 1 phép bit:
```csharp
bool allowed = (claimValue & (1 << (int)action)) == (1 << (int)action);
```

## JWT chỉ chứa danh tính, không chứa quyền

Token chỉ mang `NameIdentifier`/`Name`/`RoleId`/`securityStamp` — **không** nhúng permission bitmask
vào token. Quyền luôn được resolve lại từ DB ở mỗi request, để việc đổi quyền có hiệu lực ngay lập
tức, không phải chờ token cũ hết hạn. Kèm theo đó, so sánh `securityStamp` giữa token và DB mỗi
request để revoke token ngay khi đổi mật khẩu/khoá tài khoản.

Thứ tự resolve ưu tiên khi tính quyền hiệu lực của 1 user trên 1 function:
1. `UserClaim` — override cá nhân, nếu có thì dùng giá trị này, bỏ qua Role/Department.
2. Nếu không có `UserClaim`: OR bitwise `RoleClaim | DepartmentClaim` của user đó.

## Enforcement ở API layer

Pattern chuẩn: **1 `IEndpointFilter`** áp riêng cho từng route (không phải 1 MVC attribute dùng
chung qua `[Authorize]`-style), nhận `(functionKey, action[])`, gọi 1 service resolve quyền hiệu lực
(`HasAsync(userId, functionKey, action)`), trả `Forbid()` nếu thiếu bit nào.

```csharp
group.MapGet("", List)
    .RequireAuthorization()
    .AddEndpointFilter(new PermissionFilter("TEAMS", PermissionAction.Access, PermissionAction.Read));
```

- Route tự-phục-vụ (vd `GET /me`, đổi mật khẩu chính mình) có thể chủ đích bỏ qua filter — phải ghi
  rõ lý do bằng comment tại chỗ, không bỏ qua âm thầm.
- **Không duy trì song song 2 cơ chế enforcement khác nhau** (vd vừa có 1 MVC attribute vừa có 1
  extension method/endpoint-filter làm cùng 1 việc) trong cùng codebase — chọn đúng 1 cách, áp dụng
  nhất quán cho toàn bộ route, tránh tình trạng sửa 1 chỗ quên chỗ còn lại.
- Chặn không cho sửa role cấp cao nhất (superadmin) qua API quản trị thông thường — tránh tự khoá
  quyền hệ thống của chính mình.

## Quản trị (admin) role/permission

Cần tối thiểu các API sau:
- Liệt kê `Function` (dạng cây module).
- Liệt kê `Role`.
- `GET` permission-matrix theo role/user/department — trả về bitmask từng function.
- `PUT` cập nhật claim — nhận danh sách action được chọn, build lại bitmask, validate trong khoảng
  `0..maxMask` trước khi lưu.

Nếu hệ thống denormalize `UserClaim` để đọc nhanh lúc request (thay vì join Role→RoleClaim mỗi lần),
**khi sửa `RoleClaim`/`DepartmentClaim` phải cascade cập nhật lại `UserClaim` của mọi user liên
quan** ngay trong cùng transaction — quên bước này khiến user cũ vẫn giữ quyền sai cho tới khi có
thao tác khác vô tình trigger re-sync.

## Frontend enforcement

- 1 endpoint dạng `GET /me` trả về permission map đã resolve sẵn (`Record<functionKey, bitmask>`)
  ngay sau login — FE không tự tính bitmask từ role, chỉ hỏi BE 1 lần và giữ trong state phía client
  (signal/session), không gọi lại liên tục.
- 1 service (signal-based) expose `hasPermission(functionKey, action)`, dùng đúng lại bit logic phía
  backend (`(mask & (1<<action)) === (1<<action)`).
- Route guard dạng factory (`CanActivateFn`) nhận `(functionKey, action)`, gắn vào từng route cần
  gate trong file khai báo route.
- Trong component, gọi trực tiếp `hasPermission(...)` để ẩn/hiện action:
  `@if (permission.hasPermission('TEAMS', PermissionAction.Create)) { <button>...</button> }`.
  Hiện chưa có structural directive dùng chung kiểu `*hasPermission` — gọi trực tiếp trong template
  là đủ, không cần tự viết directive nếu không được yêu cầu.
- Enum action phía FE phải giữ đồng bộ thủ công với enum phía BE (thường bị duplicate tay, không
  generate từ 1 nguồn) — mỗi khi đổi enum BE, phải cập nhật FE cùng lúc, đây là điểm dễ bị lệch âm
  thầm nếu chỉ sửa 1 phía.

## Anti-pattern đã thấy — tránh lặp lại

- **Đừng để 2 hệ thống permission khác mục đích dùng chung 1 khái niệm "Permission".** Case thật: 1
  project có cả RBAC tổng quát cho admin/menu VÀ 1 bảng ACL chia sẻ file (kiểu "file X có share cho
  user Y không") hoàn toàn khác cơ chế (không có ClaimType/bitmask/Function liên quan gì), nhưng đặt
  tên gây liên tưởng là cùng 1 hệ thống — nếu 2 khái niệm phải cùng tồn tại, đặt tên tách biệt rõ
  ràng, đừng để người đọc sau tưởng nhầm là cùng 1 cơ chế.
- **Đừng để enforcement áp dụng không nhất quán.** Một vài route cùng nhóm chức năng bị bỏ sót
  `.AllowAnonymous()` trong khi route tương tự khác trong cùng file được gate đầy đủ — audit toàn bộ
  route liên quan mỗi khi thêm feature mới, không chỉ route đang sửa.
- **Đừng dùng enum/entity có tên gây hiểu lầm cho mục đích khác.** Case thật đã gặp: 1 enum tên
  "PermissionEnum" thực ra dùng cho geofencing (không liên quan phân quyền), 1 enum role cố định chỉ
  dùng để seed dữ liệu ban đầu rồi bỏ xó, không còn được dùng trong luồng authorization thật — đặt
  tên đúng nghĩa ngay từ đầu, xoá enum/bảng chết nếu chắc chắn không còn dùng ở bất kỳ luồng nào.
- **Đừng nhúng quyền vào JWT rồi cache dài hạn.** Nếu bitmask nằm trong token, user bị đổi quyền
  hoặc bị khoá tài khoản vẫn dùng được quyền cũ cho tới khi token hết hạn — luôn resolve theo DB mỗi
  request (có thể cache trong phạm vi 1 request, không cache qua nhiều request/nhiều phút).

## Khi implement 1 feature mới cần phân quyền

1. Xác định function/module key (vd `"TEAMS"`, `"ADMIN/DOCUMENTS"`) — thêm 1 row Function nếu là
   module hoàn toàn mới.
2. Xác định action cần cho feature đó (Access/Read/Create/Update/Delete hoặc verb domain-specific
   nếu nghiệp vụ thật sự cần).
3. Gate route bằng endpoint filter theo `(functionKey, action)` — dùng đúng cơ chế enforcement
   project đó đã có sẵn, không tự chế thêm 1 cách mới song song.
4. Nếu có UI tương ứng: đảm bảo permission map trả về đủ function key mới, gate route ở FE + ẩn/hiện
   action bằng `hasPermission()` đã có sẵn.
5. Review lại toàn bộ route mới thêm — không được để lọt `.AllowAnonymous()` ngoài ý muốn (xem
   [[reviewer]] mục 4, và mục 8 Database & Performance nếu route này cũng đụng tới query/index).
