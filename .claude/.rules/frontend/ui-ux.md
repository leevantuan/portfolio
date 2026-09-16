# Frontend UI/UX Rules

Nguồn chính: `Face/frontend/SKILL_TONE.md` — tài liệu UI/UX chi tiết nhất trong workspace, đã tổng
quát hoá bỏ phần thương hiệu/màu sắc riêng của Face.

## Design token, không hardcode

Không hardcode màu/spacing trực tiếp trong component (`#ff5a36`, `orange`...). Luôn dùng token:
CSS custom property `var(--color-primary-600)` (project dùng CSS thuần — Face, TaskFlow) hoặc class
Tailwind (project đã có Tailwind v4 — CIO, CSR, Device, Ops, ZKTime). Token mới đặt tên theo **vai
trò** (`--color-danger`), không theo trang (`--client-page-red`).

## Component dùng chung, không tự vẽ lại

Tái sử dụng class/component đã có cho: layout shell, nav, page header, card, button, form field,
data table + toolbar, badge, pagination, modal — không tự implement lại button/badge/table riêng cho
1 trang.

## Data table

Mọi bảng gắn với dữ liệu async phải có đủ: loading state, empty state, error state (+ nút retry khi
hợp lý), tổng số bản ghi, chọn page size (10/20/50), điều hướng prev/next + trang hiện tại, ô
tìm kiếm/filter khi dữ liệu có thể lớn. State list (`page`, `pageSize`, `search`, `status`) nên nằm
trong URL để có thể chia sẻ/reload.

**Phân trang phải ở server-side** — không bao giờ fetch toàn bộ dataset lớn rồi cắt trang ở client.

## Modal — chỉ dùng cho việc ngắn

Modal chỉ dùng cho: form thêm/sửa ngắn, xác nhận xoá, thông báo kết quả ngắn, chọn 1 giá trị đơn
giản. **Không** dùng modal cho: danh sách/log lớn cần tìm kiếm+phân trang, nội dung cần reload được
hoặc chia sẻ qua URL, view chi tiết nhiều phần — những cái này phải là route riêng (mở được ở tab
mới), tự fetch theo ID từ URL, không nhận nguyên list qua query string/nav-state/localStorage.

Modal phải có: tiêu đề + nút đóng, phần thân tự scroll độc lập khi cần, footer cố định, nút submit
tự disable khi request đang chạy (chống double-submit), validation rõ ràng, giữ lại dữ liệu form đã
nhập khi API lỗi.

## Action & trạng thái

- Mỗi khu vực/section chỉ 1 action chính (primary); action phụ dùng style ghost/plain; action phá
  huỷ (xoá...) luôn dùng style danger/đỏ.
- Hàng có > ~3 action thì gom vào menu kebab (3 chấm) thay vì xếp đầy nút.
- Khi request đang chạy: disable nút bấm + hiện loading indicator, chống double-submit.
- Badge phải có text, không dựa hoàn toàn vào màu để truyền đạt trạng thái.

## Thông báo

`ngx-toastr` (đã là dependency ở 6/7 FE, trừ TaskFlow) cho thông báo thành công/lỗi ngắn — nên route
qua error handler dùng chung của HTTP wrapper service (xem [[frontend/responsive]] và service pattern
trong `memory.md`), không rải `catch` + toast riêng lẻ ở từng component.

## Không được làm

Không hardcode giá trị pixel copy từ ảnh thiết kế; không rải inline style; không lạm dụng
`!important`; không remap màu trạng thái sai ngữ nghĩa (vd tô đỏ cho trạng thái "pending"); không
tắt lỗi TypeScript/ESLint để che vấn đề; không render toàn bộ dataset lớn rồi giả vờ có phân trang;
không lưu response API nhạy cảm vào `localStorage`; không hiện debug data thô ở production; không
sửa backend ngoài phạm vi nếu task chỉ yêu cầu UI.
