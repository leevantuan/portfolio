# Frontend Responsive Rules

## Breakpoint

Không có breakpoint số cụ thể nào được document trong audit. 5/7 FE dùng Tailwind v4 (CSS-first,
không có `tailwind.config.*`) — dùng breakpoint mặc định của Tailwind cho các project đó: `sm` 640px,
`md` 768px, `lg` 1024px, `xl` 1280px. Ở Face và TaskFlow (CSS thuần, không Tailwind), dùng cùng mốc
số này trong media query thủ công để giữ nhất quán hành vi giữa các project, dù không chia sẻ code.

## Table

Bảng dữ liệu nằm trong container cuộn ngang riêng (`.table-scroll` hoặc tương đương) — **không bao
giờ để cả trang cuộn ngang** vì 1 bảng quá rộng.

## Sidebar / navigation

Sidebar thu gọn ở tablet, ẩn hẳn ở mobile (kèm nút mở menu thay thế).

## Form & action row

Hàng chứa nhiều input/action chuyển từ xếp ngang sang xếp dọc (stack) khi màn hình hẹp.

## Spacing

Padding trang giảm dần theo màn hình (tham khảo: ~24–28px desktop, ~16px mobile) — con số cụ thể có
thể khác theo theme từng project, nhưng nguyên tắc "desktop và mobile phải có spacing khác nhau, định
nghĩa rõ ràng, không dùng chung 1 giá trị" là bắt buộc.

## Kiểm tra

Mọi màn hình mới phải test ở tối thiểu 3 mốc: mobile (~375–414px), tablet (~768px), desktop
(~1280px+) trước khi coi là hoàn thành task UI.
