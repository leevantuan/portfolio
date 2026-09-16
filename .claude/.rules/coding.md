# Coding Rules

## Tech Stack

Stack thực tế đang dùng trong workspace này — dùng làm mặc định khi bootstrap project mới, trừ khi
user chỉ định khác:

- **Backend**: .NET 8/9 (`net8.0` hoặc `net9.0`), `Nullable` + `ImplicitUsings` bật mặc định trong
  mọi `.csproj`. EF Core 8.x/9.x. MediatR 13-14 (ở codebase theo Clean Architecture + CQRS). Carter
  8.x cho Minimal API module (thay cho MVC Controller). Serilog cho structured logging (codebase mới
  hơn); `ILogger<T>` thuần vẫn hợp lệ cho codebase đơn giản hơn.
- **Frontend**: Angular (18–21), 100% standalone component, TypeScript strict. Tailwind CSS v4
  (CSS-first, không cần `tailwind.config.*`) khi project cần 1 CSS framework; CSS custom-property
  token thuần cũng là lựa chọn hợp lệ. Signal API cho state quản lý ở component mới.
- Khi tạo project mới: dùng bản mới nhất hợp lý tại thời điểm tạo (vd `net9.0`, Angular bản mới nhất
  ổn định) — không bắt buộc khớp version của codebase khác đã có từ trước.

## C# (.NET)

- File-scoped namespace; namespace đặt theo đúng cấu trúc thư mục của project.
- PascalCase cho: class, interface (tiền tố `I`, vd `IUserService`), enum + giá trị enum, method,
  property, public field, constant.
- camelCase cho local variable và parameter.
- `_camelCase` cho private field — chỉ áp dụng khi file/project đang theo convention này; kiểm tra
  file lân cận trước khi áp dụng, không trộn 2 style trong cùng 1 file.
- Method bất đồng bộ luôn có hậu tố `Async` (`GetByIdAsync`, không đặt tên `GetById` cho method trả
  `Task`/`Task<T>`).
- `record`/`record class` cho kiểu dữ liệu bất biến (Request/Response DTO ở tầng Contract).
- Nullable reference type luôn bật — xử lý null rõ ràng bằng kiểm tra/pattern matching, không tắt
  cảnh báo bằng `!` tràn lan chỉ để qua compile.
- Primary constructor cho class chỉ cần inject dependency (handler, service) khi giúp code rõ hơn.
- Đặt tên Command/Query theo `<Verb><Entity>Command`/`<Verb><Entity>Query`, handler tương ứng luôn
  hậu tố `Handler` (vd `CreateDeviceCommand` → `CreateDeviceCommandHandler`).
- Carter module đặt tên `<Entity>Api : ICarterModule`, route khai báo trong
  `AddRoutes(IEndpointRouteBuilder app)`.
- Không dùng `#region` để che bớt 1 file quá dài — nếu file dài vượt mức đọc được, tách thành nhiều
  class/file theo trách nhiệm.
- Ưu tiên string interpolation (`$"{x}"`) hơn nối chuỗi bằng `+`.

## TypeScript / Angular

Rules dưới đây là bộ quy ước Angular hiện đại (signal-based, standalone-only) — áp dụng cho code
Angular mới ở bất kỳ project nào trong workspace.

**TypeScript:**
- Bật strict type checking. Ưu tiên type inference khi type đã rõ ràng.
- Tránh `any`; dùng `unknown` khi chưa chắc chắn về type.

**Component:**
- Luôn dùng standalone component — **không** khai báo `standalone: true` trong decorator (mặc định
  từ Angular v20+; nếu project còn ở version cũ hơn thì vẫn khai báo tường minh, đó là yêu cầu bắt
  buộc của version đó, không phải lỗi).
- Component nhỏ, single-responsibility.
- Dùng `input()`/`output()` function thay vì decorator `@Input()`/`@Output()`.
- Set `changeDetection: ChangeDetectionStrategy.OnPush`.
- Ưu tiên inline template cho component nhỏ.
- Ưu tiên Reactive Forms hơn template-driven forms.
- Path của template/style ngoài phải relative với file TS của component.
- **Không** dùng `@HostBinding`/`@HostListener` — khai báo trong object `host` của `@Component`/`@Directive`.
- Dùng `NgOptimizedImage` cho ảnh tĩnh (không áp dụng được cho ảnh inline base64).

**State management:**
- Dùng signal cho state; `computed()` cho derived state.
- **Không** dùng `.mutate()` trên signal — dùng `update()` hoặc `set()`.

**Template:**
- Dùng control flow gốc (`@if`/`@for`/`@switch`) thay vì `*ngIf`/`*ngFor`/`*ngSwitch`.
- Dùng `class`/`style` binding thay vì `ngClass`/`ngStyle`.
- Dùng async pipe cho observable.

**Service:**
- Single responsibility; `providedIn: 'root'` cho singleton.
- Dùng `inject()` thay vì constructor injection.

**Routing:**
- Lazy-load feature route.

**Testability:**
- Không giả định global (`new Date()`...) luôn có sẵn trực tiếp trong logic khó test — cân nhắc
  inject qua service khi cần test được thời gian.

## Ghi chú

Một số codebase cũ trong workspace vẫn RxJS-first ở tầng service dù đã dùng Angular version mới —
signal là hướng đi tới (target) cho code mới, không phải yêu cầu rewrite code cũ đang chạy ổn định
(xem Scope Discipline ở `CLAUDE.md` gốc). Angular version đi kèm mỗi backend là lựa chọn per-project,
không phải quy định chung — đừng tự ý upgrade chỉ vì 1 codebase khác đang ở version mới hơn.
