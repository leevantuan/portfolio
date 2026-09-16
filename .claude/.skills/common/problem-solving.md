# Problem Solving Skill

## Mục đích

Phương pháp tiếp cận 1 bài toán kỹ thuật: chia nhỏ, xác định ràng buộc, tìm root cause, so sánh
phương án, chọn giải pháp, xác định cách verify — trước khi viết code.

## Nguyên tắc cốt lõi: smallest correct diff

Mục tiêu không phải tạo ra thay đổi lớn nhất có thể — mục tiêu là thay đổi **nhỏ nhất, đúng nhất**
để giải quyết đúng yêu cầu. Mỗi file bị đổi phải giải thích được bằng 1 câu tại sao nó liên quan đến
task (xem `CLAUDE.md` gốc — Scope Discipline). Nếu không giải thích được, xem lại có nên nằm trong
task này không.

## Không đoán khi thiếu thông tin

Không đoán API contract, cột DB, response của service ngoài, khả năng thiết bị, tên config key, hay
1 giá trị "chắc là an toàn để thay". Khi thiếu thông tin cần thiết: giữ nguyên hành vi hiện tại, ghi
rõ giới hạn trong báo cáo — không tự thiết kế lại hệ thống chỉ vì thiết kế hiện tại chưa tối ưu.

## Quy trình chia nhỏ

1. Xác định chính xác acceptance criteria — cái gì được coi là "xong".
2. Trace root cause thật (xem [[code-analysis]], [[debugging]]) trước khi nghĩ giải pháp.
3. Liệt kê ràng buộc: project này dùng pattern nào (Clean Architecture hay đơn giản), có
   `Result<T>` hay không, có test target hay không — không áp giải pháp từ project khác vào mà
   không kiểm tra trước (xem `memory.md`).
4. Nếu có nhiều phương án, so sánh ngắn gọn theo trade-off thực tế của project đó, không theo lý
   thuyết chung chung.
5. Chọn phương án tối thiểu đủ để đáp ứng acceptance criteria — không chọn phương án "tổng quát hơn
   cho tương lai" nếu không được yêu cầu.
6. Xác định cách verify **trước khi** code xong: build pass, test nào chạy được (xem [[testing]]),
   cần test thiết bị/hệ thống thật không (cần xin phép trước — xem [[workflow]]).

## Refactor — chỉ khi thật sự cần

Refactor hợp lệ khi: user yêu cầu rõ, HOẶC không refactor thì không hoàn thành task an toàn được,
HOẶC hoàn toàn cục bộ và không đổi hành vi ra ngoài luồng đang sửa. Không refactor vì "tiện thể", vì
thấy code cũ chưa đẹp, hay vì muốn áp dụng pattern của project khác vào.

## Khi phát hiện vấn đề ngoài phạm vi

Không sửa → ghi nhận riêng như 1 observation → tiếp tục task được giao → chỉ implement sau khi user
duyệt riêng cho phát hiện đó.
