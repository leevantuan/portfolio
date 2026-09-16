# Frontend Accessibility Rules

Nguồn: `ZKTime/ZKTime_FE/AGENTS.md`/`best-practices.md` (ngôn ngữ bắt buộc, dùng "MUST") kết hợp với
ví dụ cụ thể từ `Face/frontend/SKILL_TONE.md`.

## Yêu cầu bắt buộc

- **Phải** pass toàn bộ AXE check.
- **Phải** tuân thủ mức tối thiểu WCAG AA: quản lý focus, độ tương phản màu, thuộc tính ARIA.

## Cụ thể

- Mọi nút chỉ có icon (không có text) phải có `aria-label` hoặc tooltip.
- Mọi form control phải có label liên kết (không chỉ placeholder).
- Modal phải dùng đúng role/semantics dialog, quản lý focus (trap khi mở, trả lại focus khi đóng).
- Text màu phải đủ tương phản với nền; hỗ trợ `prefers-reduced-motion` cho animation/transition.
- Cỡ chữ nội dung không nhỏ hơn 12px.
- Ví dụ ARIA cụ thể đã dùng thật (Face): `aria-label="Breadcrumb"`, `aria-label="Phân trang"`,
  `aria-current="page"` trên nút trang đang active, `aria-label` cho nút prev/next dạng icon.

## Markup nhất quán, dễ test

Dùng control flow gốc (`@if`/`@for`/`@switch`) và `class`/`style` binding thay vì directive cấu trúc
cũ (`*ngIf`/`ngClass`...) — ngoài lý do convention ở [[coding]], markup native cũng dễ kiểm tra
accessibility hơn bằng tool tự động.
