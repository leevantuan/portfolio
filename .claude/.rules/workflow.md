# Workflow Rules

## 1. Khung 6 bước triển khai tính năng (Feature Implementation Pipeline)

Mọi tính năng (Feature) mới hoặc thay đổi lớn trong codebase đều tuân thủ 6 bước chuẩn hóa:

### Bước 1 — Hero: Mục tiêu & Ranh giới (Scope Boundary & AC)
- **Mục tiêu:** Xác định giá trị cốt lõi và ranh giới bất khả xâm phạm của task.
- **Quy tắc bắt buộc:**
  - Liệt kê tiêu chí nghiệm thu (Acceptance Criteria - AC) dạng checklist `[ ]`.
  - Định nghĩa rõ **"Out of Scope"**: Những thứ KHÔNG làm trong task này để chặn đứng scope creep.
  - Phân tích rủi ro tiềm ẩn (breaking change, downtime, migration).

### Bước 2 — Problem: Khảo sát hiện trạng (Codebase Gap Analysis)
- **Mục tiêu:** Hiểu sâu codebase hiện tại trước khi chạm vào mã nguồn (phối hợp `researcher`).
- **Quy tắc bắt buộc:**
  - Grep/tìm kiếm các pattern, entity, service tương tự đã có sẵn để tái sử dụng.
  - Xác định chính xác các điểm chạm (touchpoints) trên cả 7 tầng Clean Architecture và Angular.
  - Kiểm tra xem database có entity nào liên quan và cần bổ sung cột/bảng hay không.

### Bước 3 — How It Solves It: Thiết kế giải pháp & Hợp đồng API (Contract Design)
- **Mục tiêu:** Thống nhất "hợp đồng giao tiếp" giữa Frontend và Backend trước khi viết code xử lý.
- **Quy tắc bắt buộc:**
  - Tầng `Contract`: Khai báo Request/Response DTOs, định nghĩa Command/Query (`ICommand`, `IQuery`).
  - Sử dụng chuẩn `Result<T>` và mã `Error` cụ thể thay vì ném exception tùy tiện.
  - Định nghĩa route Carter Minimal API: `/api/v{version}/[resource]`.
  - Frontend Models: Khai báo interface TypeScript tương ứng trên Angular.

### Bước 4 — Product Proof / Snippet: Triển khai lát cắt dọc (Vertical Slice Implementation)
- **Mục tiêu:** Viết code thực chiến theo lát cắt dọc (Vertical Slice) qua từng tầng:
  - **Domain:** Entity, Enums, Value Objects, Domain validation rules.
  - **Persistence:** EF Core configuration, tạo migration (`dotnet ef migrations add`), index filtered (`WHERE IsDeleted = 0`).
  - **Application:** Handler xử lý nghiệp vụ + FluentValidation validator. Handlers không gọi `SaveChangesAsync` thủ công (để pipeline behavior lo).
  - **Presentation:** Carter module đăng ký route API.
  - **Frontend:** Core Service (`HttpClientService`) → Page Service (Signals) → Component UI (Tailwind CSS, đủ 4 trạng thái: Default, Loading, Empty, Error).

### Bước 5 — How It Works: Kiểm chứng luồng chạy & Edge Cases (Verification & Testing)
- **Mục tiêu:** Chứng minh code hoạt động ổn định và xử lý tốt các trường hợp biên (phối hợp `qa-testing-agent`).
- **Quy tắc bắt buộc:**
  - Viết xUnit test cho Handler và Validator (Backend); mock external services qua Interface.
  - Viết Vitest cho Angular Service/Component (Frontend).
  - Kiểm thử đầy đủ cả Happy Path lẫn Unhappy Paths (ID không tồn tại, trùng lặp dữ liệu, dữ liệu rác/null).

### Bước 6 — Final CTA: Nghiệm thu, Tài liệu & Chốt (Review, Docs & DoD)
- **Mục tiêu:** Chốt chặn chất lượng và đóng gói hoàn thiện tính năng.
- **Quy tắc bắt buộc:**
  - **Review độc lập (phối hợp `reviewer`):** Check Clean Architecture dependencies, secret protection, JWT validation, SQL injection whitelist.
  - **Tài liệu (phối hợp `documentation-agent`):** Cập nhật API doc, ghi nhận ADR nếu đổi kiến trúc, cập nhật `memory.md`.
  - **Definition of Done (DoD):** Mọi AC ở Bước 1 đều đạt `[x]`, `git status` sạch chỉ chứa đúng file trong scope.

---

## 2. Giao hàng theo giai đoạn (Staged Delivery)

Không code hết một lần rồi mới báo cáo. Với task nhiều bước: làm xong một giai đoạn → dừng lại → báo cáo ngắn gọn (đã làm gì, build/test pass hay fail, còn gì chưa xong) → chờ user xác nhận trước khi sang giai đoạn tiếp theo. Phân biệt rõ "hoàn tất" / "hoàn tất một phần" / "chưa có" cho từng giai đoạn thay vì báo chung chung "xong".

---

## 3. Quyết định đã chốt thì không tự lật lại

Nếu một quyết định kiến trúc/requirement đã được ghi nhận là "đã chốt" trong CLAUDE.md hoặc trong hội thoại trước, không tự ý đổi lại. Nếu có lý do kỹ thuật buộc phải đổi, phải giải thích lý do **trước khi** đổi, không đổi rồi giải thích sau. Mọi lần thay đổi quyết định cũ phải ghi ngày tháng + lý do rõ ràng.

---

## 4. Liên hệ hệ thống & thiết bị thật

Mặc định KHÔNG gọi API đối tác thật, thiết bị chấm công thật, hoặc DB production trừ khi user yêu cầu rõ ràng cho đúng lần đó. Có credential sẵn trong config không có nghĩa là được phép dùng. Ngược lại, khi đã được yêu cầu verify trên thiết bị/hệ thống thật, **không được suy đoán "đã hoạt động"** chỉ từ log gián tiếp — phải có bằng chứng test thực tế.

---

## 5. Audit / Investigation-only Session

Khi task chỉ là điều tra, không sửa code: phải chứng minh được phiên làm việc là read-only:
- Chụp `git status` trước và sau khi audit, xác nhận không có file nào đổi.
- Báo cáo rõ: không chạy migration/build sinh side-effects, không gửi request ghi (POST/PUT/DELETE) tới thiết bị thật, DB chỉ dùng `SELECT`.
- Kết luận suy diễn phải gắn nhãn "Probable"/"suy đoán", phân biệt với kết luận đã xác nhận trực tiếp ("Confirmed").

---

## 6. Dừng đúng lúc (Scope Discipline)

Dừng khi acceptance criteria đã được đáp ứng. Tuyệt đối không tiếp tục thêm cải tiến, cleanup, tính năng ngầm, bảo mật hay tối ưu diện rộng ngoài yêu cầu — dù có vẻ "tiện thể làm luôn".
