# KẾ HOẠCH TOÀN DIỆN (FINAL REVISED PLAN): ĐỒNG BỘ 3 NGÔN NGỮ (EN ƯU TIÊN, VI, ZH), SỬA LỖI ẨN ĐỊNH HƯỚNG TƯƠNG LAI & CẬP NHẬT CHỨNG CHỈ C1 + HSK 4

---

## 📌 BỐI CẢNH & MỤC TIÊU CỐT LÕI (OVERVIEW & GOALS)

Theo phản hồi mới nhất của người dùng:
1. **Sửa lỗi biến mất của mục "Định Hướng Tương Lai" (Roadmap) khi đổi ngôn ngữ:**
   - Khi chuyển đổi ngôn ngữ trên thanh menu, mục định hướng tương lai bị ẩn/mờ, phải bấm F5 mới hiện lại. Cần xử lý triệt để nguyên nhân vòng đời DOM và animation, bảo đảm khi đổi ngôn ngữ nội dung cập nhật tức thì và không bị ẩn.
2. **Đồng bộ hóa 3 ngôn ngữ (EN, VI, ZH) từ phần Skills đến Định Hướng Tương Lai:**
   - Toàn bộ các tiêu đề, mô tả, vai trò, nhóm kỹ năng và quy trình điều phối AI không được hardcode tiếng Việt.
   - Các từ chuyên ngành chuẩn quốc tế (như *Linux, Windows Server, Active Directory, GPO, DNS, DHCP, Cisco CCNA, CCNP, OSPF, BGP, VLAN, FortiGate, Azure AKS, Docker, Kubernetes, CI/CD, ASP.NET Core 8, Clean Architecture, CQRS, RabbitMQ, PostgreSQL, Redis, MongoDB, SignalR, Bitwise AND, RBAC...*) được giữ nguyên Tiếng Anh chuẩn mực ở cả 3 phiên bản ngôn ngữ.
3. **Ưu tiên ngôn ngữ chính mặc định là Tiếng Anh (`ENG`):**
   - Khi người dùng truy cập trang web, mặc định hiển thị Tiếng Anh (`ENG`).
4. **Cập nhật chứng chỉ ngoại ngữ:**
   - Chứng chỉ tiếng Anh: **International Level C1 (CEFR C1)** thay vì TOEIC.
   - Chứng chỉ tiếng Trung: **HSK Level 4 (HSK 4)**.

---

## 🔍 PHÂN TÍCH KỸ THUẬT & GIẢI PHÁP CHI TIẾT

### 1. Nguyên nhân & Giải pháp Sửa lỗi Ẩn "Định Hướng Tương Lai" (Roadmap)
* **Nguyên nhân gốc rễ:**
  - File `src/app/pages/roadmap/roadmap.component.css` định nghĩa `.gnome-reveal-item` với `opacity: 0; filter: blur(8px); transform: translateY(24px) scale(0.96);`.
  - Trong `RoadmapComponent`, `IntersectionObserver` chỉ được khởi tạo một lần duy nhất tại `ngAfterViewInit()`.
  - Khi người dùng click chuyển ngôn ngữ, `UIResource.roadmap.levels` nhận mảng mới từ file ngôn ngữ khác. Angular `*ngFor` hủy bỏ các thẻ DOM cũ và render lại thẻ DOM mới.
  - Các phần tử DOM mới tạo ra bị kẹt ở trạng thái ban đầu (`opacity: 0`) do không có class `.is-revealed` và không được Observer theo dõi lại.
* **Giải pháp dứt điểm:**
  1. Thêm `trackBy: trackByLevel` vào `*ngFor="let lvl of UIResource.roadmap.levels; trackBy: trackByLevel"` để Angular nhận diện khóa duy nhất (`level`) và tái sử dụng DOM nodes hiện có, chỉ cập nhật nội dung văn bản.
  2. Trong `ngOnChanges` của `RoadmapComponent`, khi phát hiện `changes['lang']`:
     ```typescript
     if (changes['lang']) {
       this.updateResource();
       setTimeout(() => {
         this.revealAll();
       }, 0);
     }
     ```
     Hàm `revealAll()` duyệt qua tất cả `.gnome-reveal-item` và gắn ngay class `is-revealed`.
  3. Áp dụng đồng bộ cho `SkillsComponent` (`.scroll-reveal-item`) để bảo đảm an toàn 100%.

---

### 2. Thiết lập Tiếng Anh (`ENG`) làm Ngôn ngữ Mặc định Toàn Ứng Dụng
* **`src/app/shared/session.service.ts`:**
  - Khởi tạo Signal: `currentLang = signal<'VI' | 'ENG' | 'ZH'>('ENG');`
  - Nếu `localStorage`/`sessionStorage` chưa có giá trị, tự động gán mặc định là `'ENG'`.
* **`src/app/layout/home/home.component.ts`:**
  - Khởi tạo: `lang: string = 'ENG';`
  - Gán `UIResource: any = UIResourceENG;`
* **`src/app/pages/header/header.component.ts`:**
  - Khởi tạo: `lang: string = 'ENG';`, `UIResource: any = UIResourceENG;`
* **Các component con:**
  - Đặt `@Input() lang: string = 'ENG';`

---

### 3. Cập nhật Chứng Chỉ C1 Quốc Tế & HSK 4
* Cập nhật trong cả 3 tập tin ngôn ngữ (`eng.ts`, `vn.ts`, `zh.ts`):
  ```typescript
  { 
    name: 'C1 CEFR', 
    issuer: 'International English Proficiency — Level C1 (CEFR)', 
    code: 'CEFR-C1', 
    category: 'Language' 
  },
  { 
    name: 'HSK 4', 
    issuer: 'Chinese Proficiency Test — Level 4 (HSK 4)', 
    code: 'CTI-HSK4', 
    category: 'Language' 
  }
  ```
* Đồng thời cập nhật trong danh sách `tiers[4]` (Tầng 05 / Kỹ năng ngoại ngữ).

---

### 4. Chuẩn hóa Đa Ngôn Ngữ Phần Skills (Từ Section 01 đến Section 06)
* Bổ sung khối dữ liệu `skills_page` trong `eng.ts`, `vn.ts`, `zh.ts`:
  - **Section 01 - Systems & Server Infrastructure:** Tiêu đề, mô tả tổng quan, 3 nhóm kỹ năng (Hệ điều hành, Ảo hóa & Sao lưu, Giám sát & Automation), thông số SLA/RPO/RTO.
  - **Section 02 - Enterprise Networking & Security:** Tiêu đề, mô tả tổng quan, 3 nhóm kỹ năng (Định tuyến & Chuyển mạch, Tường lửa & VPN, Không dây & Vận hành).
  - **Section 03 - Cloud, DevOps & Automation:** Tiêu đề, mô tả tổng quan, 3 nhóm kỹ năng (Nền tảng Đám mây, CI/CD Pipelines, Giám sát & Scripting).
  - **Section 04 - Backend & Distributed Systems:** Tiêu đề, mô tả tổng quan, 3 nhóm kỹ năng (Framework & Clean Architecture, Dữ liệu & Caching, Message Broker & Real-time).
  - **Section 05 - 8-Phase AI Engineering Orchestrator:** Tiêu đề, mô tả 8 chặng điều phối từ Khảo sát đến Tự phục hồi, các vai trò AI Subagent và log viễn trắc.
  - **Section 06 - Grand Convergence Ecosystem:** Hệ thống hiệp đồng 4 domain + lớp AI, kịch bản xử lý sự cố.
* Toàn bộ thuật ngữ kỹ thuật giữ chuẩn Tiếng Anh quốc tế.
* Template HTML `skills.component.html` và TS `skills.component.ts` liên kết trực tiếp vào `UIResource.skills_page`.

---

## 🚀 KẾ HOẠCH TRIỂN KHAI THEO GIAI ĐOẠN (STAGED EXECUTION)

| Giai đoạn | Nội dung công việc | Trạng thái |
| :--- | :--- | :--- |
| **Giai đoạn 1** | Cập nhật cấu hình mặc định `ENG`, sửa chứng chỉ C1 & HSK 4 trong 3 file `eng.ts`, `vn.ts`, `zh.ts` | ⏳ Sẵn sàng |
| **Giai đoạn 2** | Sửa triệt để bug ẩn Roadmap khi đổi ngôn ngữ (`trackByLevel`, `revealAll()` trong `RoadmapComponent` & `SkillsComponent`) | ⏳ Sẵn sàng |
| **Giai đoạn 3** | Xây dựng bộ dữ liệu đa ngôn ngữ `skills_page` (EN, VI, ZH) với thuật ngữ quốc tế giữ nguyên tiếng Anh | ⏳ Sẵn sàng |
| **Giai đoạn 4** | Cập nhật template `skills.component.html` và logic dữ liệu động trong `skills.component.ts` | ⏳ Sẵn sàng |
| **Giai đoạn 5** | Biên dịch `ng build`, kiểm thử tương tác trực tiếp bằng Browser Subagent và báo cáo kết quả | ⏳ Sẵn sàng |
