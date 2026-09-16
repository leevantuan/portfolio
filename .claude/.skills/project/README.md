# Project Skills

## Mục đích

Chứa skill riêng cho từng project — domain-specific knowledge (nghiệp vụ chấm công, meal check-in,
DingTalk integration...) không thuộc về Core dùng chung. Mỗi project skill có thể là 1 folder riêng
dưới đây khi được tạo.

## Trạng thái hiện tại

Chưa có project skill nào được tạo trong `.claude/.skills/project/` — thư mục này để trống có chủ
đích cho đến khi Core dùng chung (`.rules/`, `.agents/`, `.skills/common/`) đã vận hành ổn định trên
thực tế (không chỉ mới viết xong). Không tự ý tạo skill riêng cho CIO/CSR/Device/Ops/TaskFlow/ZKTime/
Face tại đây trừ khi được yêu cầu — 2 project đã có tài liệu domain riêng thì đặt trong chính
`CLAUDE.md` của project đó (Face, TaskFlow), không phải ở đây.

## Khi được yêu cầu tạo project skill mới

- Tạo 1 folder riêng theo tên project/domain (vd `meal-checkin/`, `dingtalk/`), không trộn vào
  `.skills/common/`.
- Chỉ chứa kiến thức đặc thù nghiệp vụ của project đó — pattern kỹ thuật dùng chung (Clean
  Architecture, Result<T>, Carter...) đã nằm ở `.rules/`, không lặp lại ở đây.
- Nếu 1 kiến thức tưởng là "riêng của project X" nhưng thực ra áp dụng được cho ≥ 2 project, cân nhắc
  đưa lên `.rules/` hoặc `.skills/common/` thay vì lặp lại ở nhiều project skill.
