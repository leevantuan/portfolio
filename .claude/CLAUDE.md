# CLAUDE.md — Claude Agent Core

## Vai trò

Đây là bộ não / entry point chung cho **7 project độc lập** sống cạnh nhau trong workspace này
(CIO, CSR, Device, Face, Ops, TaskFlow, ZKTime — mỗi project là 1 git repo riêng, không share code).
File này quy định cách Claude vận hành ở mức tổng quát và điều phối việc dùng `.agents/`, `.rules/`,
`.skills/`, `memory.md`. Rules ở đây là **quy chuẩn chung được đúc kết từ audit thực tế** của cả 7
project — không phải lý thuyết áp đặt từ trên xuống.

**Quan trọng:** rules mô tả *quy ước hướng tới (target convention)* cho code mới, không phải lệnh bắt
buộc phải rewrite code cũ đang chạy ổn định. 3/7 backend (CIO, CSR, TaskFlow) không dùng
MediatR/Carter — đó là lựa chọn hợp lệ của project đó tại thời điểm viết, không phải lỗi cần sửa ngay.
Đừng tự ý refactor một project sang "đúng chuẩn Core" nếu không ai yêu cầu — xem Scope Discipline bên
dưới.

## Nguyên tắc tối cao — Scope Discipline

Đây là nguyên tắc quan trọng nhất, áp dụng cho MỌI task, MỌI project. Đúc kết từ TaskFlow/CLAUDE.md
(được viết ra sau khi agent từng tự ý xoá credential thật trong appsettings.json nhiều lần — xem
[[security]]).

Thứ tự ưu tiên khi có xung đột:
1. Bảo toàn dữ liệu và config của user.
2. Làm đúng cái user yêu cầu.
3. Tôn trọng các ràng buộc/loại trừ user đã nêu.
4. Tạo thay đổi nhỏ nhất, đúng nhất.
5. Verify đúng hành vi được yêu cầu.
6. Báo cáo rủi ro không liên quan phát hiện được — KHÔNG tự sửa.
7. Dừng lại khi task được yêu cầu đã xong.

Không suy diễn quá task. Không mở rộng phạm vi. Không cải thiện toàn bộ repo. Không thay thế giải
pháp user yêu cầu bằng thiết kế mình thích hơn.

Cụ thể, **không được** (trừ khi user yêu cầu rõ ràng cho từng việc):
- Thêm refactor/cleanup/abstraction/optimization/security-hardening/migration không liên quan.
- Sửa code đang chạy ổn định ngoài luồng được yêu cầu.
- Tự bịa thêm requirement, tự đoán API contract/DB column/response của service ngoài/khả năng thiết bị.
- Rename vì "đẹp hơn", move file để "tổ chức lại", đổi pattern vì sở thích, upgrade dependency không ai
  hỏi, reformat cả file, xoá code "unused" mà chưa chứng minh nó thật sự không được dùng ở đâu.
- Tắt/xoá test hoặc làm yếu assertion chỉ để build xanh.
- Liên hệ hệ thống/thiết bị thật bên ngoài (API đối tác, thiết bị chấm công, DB production...) khi
  chưa được yêu cầu rõ ràng cho lần đó — có credential không có nghĩa là được phép gọi.

Refactor chỉ được phép khi: user yêu cầu rõ, HOẶC không refactor thì không thể hoàn thành task an
toàn, HOẶC hoàn toàn cục bộ và không đổi hành vi ra ngoài luồng đang sửa.

Khi phát hiện vấn đề không liên quan đến task: không sửa → ghi nhận riêng (observation) → tiếp tục
task được giao → chỉ implement sau khi user duyệt.

## Bảo vệ config & secret

Không bao giờ xoá/rỗng hoá/ghi đè/khôi phục/sanitize/thay thế/di dời một giá trị config thật (API
key, connection string, credential thiết bị...) mà không có sự chấp thuận **rõ ràng cho từng lần**
của user — kể cả khi nhìn "giống secret thật", kể cả khi cách làm sạch hơn (User Secrets, env var)
có vẻ hiển nhiên tốt hơn. Nếu phát hiện secret thật nằm trong file tracked: không xoá/mask/rotate,
không in giá trị đó ra log/docs/diff — chỉ báo path file, tên key, tình trạng
Configured/Missing, rủi ro, và phương án cần user duyệt. Chi tiết đầy đủ: [[security]].

## Quy trình làm việc

Xem [[workflow]] cho quy trình đầy đủ. Tóm tắt: không code hết một lần — chia giai đoạn, sau mỗi
giai đoạn dừng lại báo cáo ngắn gọn (đã làm gì / build-test pass hay fail / còn gì chưa xong) và chờ
xác nhận trước khi sang giai đoạn tiếp theo. Quyết định kiến trúc/requirement đã chốt thì không tự ý
lật lại — nếu có lý do kỹ thuật buộc phải đổi, giải thích trước khi đổi.

## Điều phối agent

- **Researcher** ([[researcher]]) — khi cần khảo sát codebase/tìm root cause trước khi sửa.
- **Reviewer** ([[reviewer]]) — sau khi implement xong, trước khi báo hoàn thành.
- **QA Testing Agent** ([[qa-testing-agent]]) — khi cần test feature/API/regression.
- **Documentation Agent** ([[documentation-agent]]) — khi cần cập nhật docs/memory sau thay đổi thật.

Flow tham khảo: Research → Implementation → Review → QA → Documentation → Complete. Không nhất thiết
phải qua đủ 4 agent cho mọi task nhỏ — dùng đúng agent cần thiết cho quy mô task.

## Cấu trúc thư mục

```
.claude/
├── CLAUDE.md        # file này
├── memory.md        # tri thức dài hạn: tech stack, quy ước, bad pattern đã audit
├── README.md        # giới thiệu tổng quan
├── .agents/         # 4 sub-agent chuyên trách
├── .rules/          # rules dùng chung (workflow, coding, architecture, security, git, testing,
│                    #   backend/*, frontend/*)
└── .skills/
    ├── common/      # skill dùng chung mọi project
    └── project/     # skill riêng từng project (chưa triển khai — xem project/README.md)
```

## Không chứa gì ở đây

Domain-specific business logic (nghiệp vụ chấm công, meal check-in, DingTalk...) không thuộc file
này hay `.rules/` chung — nó thuộc `CLAUDE.md` riêng của từng project (Face, TaskFlow đã có; CIO,
CSR, Device, Ops chưa có).
