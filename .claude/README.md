# Claude Agent Core

Bộ Core dùng chung cho 7 project độc lập trong workspace `Tranning AI` (CIO, CSR, Device, Face, Ops,
TaskFlow, ZKTime). Không phải monorepo — mỗi project là 1 git repo riêng; Core chỉ cung cấp quy ước,
agent, và skill dùng chung để Claude làm việc nhất quán trên cả 7.

## Structure

- `CLAUDE.md` — bộ não / nguyên tắc tổng, bắt đầu đọc từ đây.
- `memory.md` — tri thức dài hạn: tech stack từng project, pattern chung đã xác nhận, bad pattern đã
  audit cần tránh.
- `.agents/` — 4 sub-agent chuyên trách (Researcher, Reviewer, QA Testing, Documentation).
- `.rules/` — rules dùng chung: workflow, coding, architecture, security, git, testing +
  `backend/{api,database,error-handling,logging,performance}` + `frontend/{ui-ux,responsive,accessibility}`.
- `.skills/common/` — skill dùng chung (code-analysis, debugging, problem-solving, permission).
- `.skills/project/` — skill riêng từng project (chưa triển khai, xem `project/README.md`).

## Core Agents

- Researcher — khảo sát codebase, trace flow, tìm root cause trước khi sửa.
- Reviewer — gatekeeper: kiến trúc, bảo mật, scope discipline, consistency.
- QA Testing Agent — hướng dẫn viết/chạy test, phân loại kết quả rõ ràng.
- Documentation Agent — chuẩn hoá ADR, đồng bộ docs với code thật.

## Nguồn gốc nội dung

Rules trong `.rules/` không phải lý thuyết áp đặt — được đúc kết từ audit thực tế source code + tài
liệu audit (PROJECT_AUDIT.md, review_pj.md, ARCHITECTURE.md, FINAL_PROJECT_AUDIT/REAUDIT...) của cả
7 project, cộng với 2 file `CLAUDE.md` đã viết tay chi tiết nhất trong workspace (Face, TaskFlow).
Khi rule và code thực tế của một project lệch nhau (ví dụ ZKTime), rule ghi rõ trạng thái thật, không
giả vờ project đó đã tuân thủ.
"# agent_claude" 
