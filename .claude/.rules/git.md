# Git Rules

## Không phá config bằng lệnh git rộng

Không chạy `git checkout -- <file>`, `git restore`, `git clean`, hay `git reset --hard` nhắm vào file
config (`appsettings*.json`, `.env*`, config thiết bị...) mà không có sự chấp thuận rõ ràng cho đúng
lần đó — kể cả khi mục tiêu chỉ là "dọn working tree cho sạch". Đây là hệ quả trực tiếp của rule bảo
vệ config ở [[security]] phần B: agent từng làm mất credential thật theo cách này.

Trước bất kỳ lệnh git nào có thể xoá thay đổi chưa commit (`checkout`/`restore`/`reset`/`clean`),
chạy `git status` trước để biết đang có gì, và stash/commit nếu cần giữ lại.

## Audit / investigation session phải để lại bằng chứng không đổi gì

Khi một phiên làm việc chỉ là điều tra (không sửa code), chụp `git status` trước và sau, và nêu rõ
trong báo cáo là không có file nào bị đổi — pattern đã dùng thật trong 2 audit report của Face (xem
[[workflow]]).

## Không thao túng git để "cho commit sạch"

Không disable/xoá test đang fail, không weaken assertion, chỉ để có một commit trông "xanh" — nếu
build/test đang fail, báo cáo rõ trạng thái thật thay vì che đi bằng thay đổi ở git.

## Commit message

Không có convention riêng nào được ghi lại trong 7 project audit — mặc định dùng Conventional
Commits (`feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`) khi không có convention khác đã
tồn tại rõ ràng trong lịch sử commit của project đó; nếu project đã có style khác, giữ theo style đó
thay vì áp đặt Conventional Commits.

## Phạm vi commit

Chỉ tạo commit khi user yêu cầu (xem quy tắc chung của harness). Khi commit, review lại
`git status`/`git diff` đã stage — không commit file nghi ngờ chứa secret thật mà chưa kiểm tra nội
dung, kể cả khi tên file trông vô hại.
