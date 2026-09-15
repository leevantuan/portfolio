# Portfolio – Lê Văn Tuấn | Project Memory

## Tổng Quan Dự Án
- **Framework:** Angular 19 (Standalone Components)
- **Dev Server:** `ng serve` → `http://localhost:4200/`
- **Tone chủ đạo:** Tone 07 — Technical Blueprint
  - `07B Dark Console` (mặc định ưu tiên): nền `#0B0B0B`, text `#F5F5F5`, accent `#7ED957`
  - `07A Light Blueprint`: nền `#FFFFFF`/`#FAFAFA`, border `#D8D8D8`, text `#111111`, accent `#7ED957`
- **Font:** IBM Plex Mono (headings/labels), Inter (body)

---

## Hero Section — Global Network Topology
**File:** `src/app/pages/global-network/global-network.component.html` & `.css`

### Quả Địa Cầu 3D Cyber Dot-Matrix
- Lục địa tạo từ ma trận chấm (`fill="var(--accent)" r="1.4"`) không dùng nét bo tròn hoạt họa
- 2 tile lục địa (width=640px) chuyển động vô hạn bằng `continentsScrollOrbit` 28s
- Điểm mốc `VN-HQ` với beacon radar ping trên dải chấm hình chữ S Vietnam
- 2 vòng quỹ đạo elip nghiêng (-28°, +38°) với vệ tinh bay quanh
- Clip path `globeSphereClip` giới hạn lục địa bên trong hình cầu
- Latitude curves (ellipses) phủ lên trên lục địa đang xoay
- Rim-light atmosphere glow phủ ngoài cùng

### 8 Trạm Infrastructure (Bố Cục Chòm Sao Elip Ôm Trọn Quả Cầu & Lấp Đầy Vùng Trống Đỉnh)
| STT | Trạm | Vị Trí Mới | Màu Accent | Tech Stack Typewriter (Dòng 1 / Dòng 2) |
|-----|------|------------|------------|-----------------------------------------|
| 1 | `[ CLIENTS ]` | Upper Left Shoulder (X=340, Y=65) | `var(--accent)` | Angular 19, TypeScript, TailwindCSS / Desktop PC, Laptop, Mobile PWA, REST |
| 2 | `[ FIREWALL & SECURITY ]` | Mid Left Upper (X=110, Y=210) | `#f59e0b` | Fortinet FortiGate, Palo Alto, ASA / IPsec VPN, Next-Gen WAF, IDS/IPS Shield |
| 3 | `[ CISCO & UNIFI NETWORK ]` | Mid Left Lower (X=110, Y=395) | `var(--accent)` | Cisco Catalyst 3850X / 2960X, PoE+ / UniFi Controller, AP WiFi 6, VLAN 10/20/30 |
| 4 | `[ DATABASE ]` | Bottom Left (X=120, Y=635) | `var(--accent)` | MS SQL Server, PostgreSQL, MongoDB / Redis Cache, MySQL, ACID Replication |
| 5 | `[ CLOUD PROVIDERS ]` | Upper Right Shoulder (X=820, Y=65) | `var(--accent)` | AWS (EC2, S3, RDS, VPC), Azure Cloud / Google Cloud GCP, Kubernetes, Docker |
| 6 | `[ SERVERS & VIRTUALIZATION ]` | Mid Right Upper (X=1060, Y=210) | `var(--accent)` | VMware ESXi Cluster, vCenter Server HA / Windows Server 2022, Active Directory, Linux |
| 7 | `[ STORAGE & BACKUP ]` | Mid Right Lower (X=1060, Y=395) | `var(--accent)` | Synology NAS 24-Bay RAID 10, Btrfs / Veeam Backup Server, 3-2-1 Rule, S3 Offsite |
| 8 | `[ MONITORING & OBSERVABILITY ]` | Bottom Right (X=975, Y=635) | `var(--accent)` | Grafana NOC, Prometheus, Zabbix Server / SNMP Real-time Metrics, Alerting, APM |

- **Bố Cục Dàn Trải Cân Đối (Elliptical Constellation):**
  - Trạm `[ CLIENTS ]` và `[ CLOUD PROVIDERS ]` được dời vào khu vực vai trên của quả cầu, phủ kín khoảng trống đỉnh (vùng khoanh đỏ) bằng toàn bộ thiết bị isometric và nhãn trạm.
  - Các trạm còn lại được dãn đều theo đường cong elip từ đỉnh xuống đáy, tạo nên một hệ sinh thái kiến trúc hạ tầng bao bọc quả cầu 3D với mật độ hài hòa, không còn khoảng trống thừa.
- **Tính năng Hover Telemetry Chat Popup:**
  - Mỗi khi rê chuột vào trạm, trạm phát sáng xanh và mở ngay popup chat telemetry kế bên.
  - **Đèn báo thiết bị (Hardware Indicator LED):** Đỉnh mỗi popup có chấm tròn phát sáng xanh kèm hiệu ứng radar xung (`<circle class="animate-ping">` + `<circle>` tĩnh) mô phỏng đèn LED trạng thái thiết bị đang hoạt động.
  - **Hiệu ứng chữ chạy Typewriter:** Công nghệ hiển thị theo thời gian thực (18ms/ký tự) tuần tự dòng 1 rồi dòng 2, kết thúc bằng con trỏ khối nhấp nháy `▍`.
  - **Speech Tail & Cyber Corners:** Khung popup có đuôi nhọn trỏ trực tiếp về nhãn trạm và 4 góc viền công nghệ.
  - **Tránh che phủ (Non-overlapping):** Các popup được căn chỉnh tọa độ nằm hoàn toàn bên ngoài bán kính quả địa cầu và pipeline bên phải. Popup gắn `pointer-events-none` giúp lướt chuột mượt mà không bị giật lag.

### Quy Tắc Z-Index & Bố Cục Hero Bar Tinh Gọn (Content-on-Top)
- **Header Brand Bar:** Đã loại bỏ ô vuông logo `[LT]` thừa; bố cục tinh gọn với đèn radar beacon xanh neon (`animate-ping`) phát sáng dẫn trước `Le Van Tuan` và dòng chức danh `IT SYSTEM & NETWORK ENGINEER`.
- **Top Hero Telemetry Strip:** Đã loại bỏ dòng tiêu đề lớn `Connect Systems. Build Possibilities.`; tái cấu trúc thành thanh telemetry kỹ thuật 1 dòng tinh xảo:
  - Chip status: `// DESIGN > BUILD > DEPLOY > OPERATE` kèm đèn pulse xanh.
  - Phân cách domain: `| Enterprise Infrastructure • Hybrid Cloud • High-Availability Networks • Automated Systems`.
  - Nút hành động: `> VIEW ARCHITECTURE` và `● 99.99% UPTIME`.
  - Giải phóng toàn bộ khoảng không gian phía trên, giúp quả địa cầu 3D và 8 trạm hạ tầng hiển thị thoáng đãng, tuyệt đối không bị che khuất.
- **Phần cứng isometric** (chassis, blades, cylinders): vẽ TRƯỚC trong SVG
- **Chữ tiêu đề trạm**: vẽ SAU cùng với khung đệm `fill="var(--bg)" fill-opacity="0.9" stroke="var(--border)"`
- **Khớp màn hình tuyệt đối (Full-Screen Viewport trừ Header):**
  - Khung Hero Page 1 (`home.component.html`): `h-screen max-h-screen flex flex-col justify-between overflow-hidden`.
  - Header: `shrink-0 z-40` (~56px).
  - Khung Hero con (`app-global-network`): `h-full flex-1 min-h-0 flex flex-col justify-between`.
  - Canvas SVG: `flex-1 min-h-0 w-full max-h-full` tự động co giãn theo không gian dọc còn lại (`preserveAspectRatio="xMidYMid meet"`).
  - Thanh Specs Bar đáy: `2+ YRS IT INFRA & NETWORKS` • `1+ YRS DEV & CLOUD` • `8+ CERTS` • `2 LANG EN (TOEIC) • ZH (HSK)` (đã loại bỏ VI theo yêu cầu ứng viên là người Việt, chỉ ghi nhận 2 ngoại ngữ). Cấu trúc `shrink-0 z-30 pb-3 pt-2 pr-4 lg:pr-[360px]` luôn hiển thị 100% ngay mép đáy màn hình tại vị trí cuộn `scrollY = 0`, không bị tụt xuống dưới viewport.
- **Background grid**: `z-0 pointer-events-none`

### Cáp Isometric & Xung Dữ Liệu
- 8 cáp từ trạm đến điểm tiếp xúc bề mặt cầu (góc 30°/150°)
- `<animateMotion>` trên mỗi cáp với thời gian khác nhau (2.9s–4.2s)
- Cáp Firewall màu `#f59e0b`, còn lại `var(--accent)`

### Pipeline Kỹ Thuật (Far Right)
`IDEA → DEVELOP → DEPLOY → OPERATE → IMPROVE` + `v1.0.0`

---

## Infrastructure HUD Card (Góc Dưới Phải)
**File:** `src/app/pages/infrastructure-hud/infrastructure-hud.component.html` & `.css`

- **Vị trí:** `fixed bottom-4 right-4 z-40`
- **Kích thước:** `w-[340px] max-w-[92vw]`
- **Map:** SVG `viewBox="0 0 380 230"` — high-density dotted matrix 6 châu lục
- **Header:** `// GLOBAL INFRASTRUCTURE` + Legend (`Online 24 / Warning 1 / Offline 0`) + nút minimize
- **5 Nodes:** `US-WEST (OREGON)`, `EU-CENTRAL (FRANKFURT)`, `AP-SOUTHEAST (SINGAPORE)`, `ASIA-EAST (TOKYO)`, `VN-HQ (HO CHI MINH)`
- **Arcs:** `<animateMotion>` từ VN-HQ đến các node khác (1.6s–3.4s)
- **4 Bottom Cards:** ⬡ 5 Sites | 🖥️ 60 Devices | 👤 1.2k Users | ☁️ 99.99% Uptime
- **Corner crosshairs:** `+` tại 4 góc bản đồ
- **Side annotations:** Trái: CONNECTING/PEOPLE/SYSTEMS/OPPORTUNITIES | Phải: LOW LATENCY/HIGH AVAILABILITY/GLOBAL SCALE

---

## Architecture Modal (2 Tab - Ưu Tiên Network Topology Đầu Tiên)
**File:** `src/app/pages/diagram-viewer/diagram-viewer.component.html` & `.ts`

- Trigger: nút `> VIEW ARCHITECTURE` trong hero (mặc định mở ngay Tab 1 Network)
- **Tab 1: `[ 01. NETWORK TOPOLOGY ]`** — Sơ đồ mạng hạ tầng chuẩn Doanh Nghiệp (Enterprise Network Topology - Mặc định kích hoạt):
  - Canvas SVG: `viewBox="0 0 1060 650"` hỗ trợ co giãn toàn diện, tương thích 2 theme `07B Dark Console` (mặc định) và `07A Light Blueprint`.
  - **Bảo mật danh tính & Anonymization:**
    - `Head Office / HQ (VN)`: Trụ sở chính
    - `Site A (Branch)`: Văn phòng chi nhánh
    - `Site B (Regional)`: Văn phòng khu vực
    - Toàn bộ tên thực nhạy cảm đã được chuẩn hóa theo chuẩn tài liệu doanh nghiệp.
  - **Thiết bị phần cứng chính xác 100%:**
    - `FORTINET FortiGate 1500D`: Main Perimeter Firewall (HA Active, 10G SFP+ Uplinks).
    - `FORTINET FG-100F`: Edge Security Gateway tại Site A và Site B.
    - `CISCO Catalyst 3850X`: Core Switch L3 Routing & VLAN Aggregation (10G Backbone).
    - `CISCO Catalyst 2960X`: 3 bộ Access Switch (Office, Production, CCTV).
    - `UNIFI NETWORK`: UniFi Controller (Cloud/On-prem), UniFi Switch, Gateway, và dàn AP (AP-Office, AP-Meeting, AP-Warehouse 802.11ax WiFi 6).
    - `Storage & Backup`: Synology NAS (HQ) 24x Bay RAID 10 Btrfs và Veeam Backup Server (3-2-1 Rule).
    - `Data Center / HQ & Server Farm`: AD Server (Active Directory / DNS / DHCP), File Server, VMware ESXi Cluster & vCenter HA, Backup Svr, Application Server, Database Server (SQL/NoSQL), Monitoring Server (Grafana / Zabbix), NVR/CCTV.
    - `DMZ (Isolated Perimeter)`: Web Server, Mail Server, VPN Server, Other Public Svcs.
  - **Nguyên lý dòng chảy dữ liệu (Traffic Flow) chuẩn xác:**
    - Internet (Dual WAN: WAN 1 & WAN 2) đi trực tiếp vào FortiGate 1500D.
    - FortiGate 1500D thiết lập IPsec VPN kết nối Site A & Site B, Direct Connect / VPN tới AWS & Azure, và phân lập khu vực DMZ.
    - FortiGate 1500D kết nối Trunk cáp quang 10GbE SFP+ xuống Cisco Catalyst 3850X Core Switch.
    - Core Switch kết nối hạ tầng nội bộ: Data Center / HQ, Server Zone, Storage & Backup (Synology + Veeam), UniFi Controller, và 3 Access Switches.
    - Access Switches phân phối tới các VLAN tách biệt: VLAN 10 (Office Subnet 192.168.10.0/24), VLAN 20 (IoT/Warehouse Subnet 192.168.20.0/24), VLAN 30 (CCTV Subnet 192.168.30.0/24).
  - Time filter: `Live / 1h / 6h / 24h / 7d`
  - Animated packet pulses: `<animateMotion>` trực quan hóa chuyển động gói tin trên các tuyến WAN, IPsec, Trunk và Access.
- **Tab 2: `[ 02. SYSTEM ARCHITECTURE ]`** — 4 tầng vi dịch vụ phân tán:
  1. Client & Ingress (Angular SPA / API Gateway)
  2. Core Microservices (Auth, Order, Real-time, ERP)
  3. Broker & Storage (RabbitMQ, Redis, PostgreSQL, MongoDB)
  4. K8s AKS & Observability (Prometheus, Grafana NOC, Jenkins CI/CD)

---

## Sections Bên Dưới Hero (Scroll Flow)
| Section | ID | Component |
|---------|----|-----------|
| Skills Matrix (4 Domain) | `#skills` | `app-skills` |
| Career Roadmap 6 cấp + Grafana Telemetry | `#roadmap` | `app-roadmap` |
| 8 Chứng Chỉ Quốc Tế | `#credentials` | `app-credentials` |
| Kinh Nghiệm (2Y Infra + 1Y Dev) | `#experience` | `app-experience` |
| Dự Án Featured | `#projects` | `app-projects` |
| Contact Terminal | `#contact` | `app-contact` |
| Footer | — | `app-footer` |

---

## CSS Variables & Token (src/styles.css)
```css
/* Light 07A */
--bg: #FFFFFF; --surface: #FAFAFA; --surface-2: #F3F4F6;
--border: #D8D8D8; --text-1: #111111; --text-3: #6B7280;
--accent: #7ED957; --accent-text: #206d11;

/* Dark 07B */
--bg: #0B0B0B; --surface: #111111; --border: #333333;
--text-1: #F5F5F5; --accent: #7ED957; --accent-text: #7ED957;
```

---

## Global CSS Classes Quan Trọng (src/app/pages/global-network/global-network.component.css)
- `.blueprint-grid-full` — background lưới kỹ thuật
- `.continents-scroll-track` — animation xoay lục địa (28s linear infinite, translateX(-640px))
- `.cable-flow-1/2/3` — animation dòng dữ liệu cáp (1.3s/1.7s/2.1s)
- `.station-hover` — hover glow + polygon stroke accent

---

## Session & Theme Service
**File:** `src/app/shared/session.service.ts`
- Default theme: `light` (lưu vào localStorage)
- Toggle: `data-theme="light"` / `data-theme="dark"` VÀ class `dark` trên `<html>`
- Tailwind v4 `@custom-variant dark`: map cả `[data-theme="dark"]` và `.dark`
- Toàn bộ HUD (`infrastructure-hud`) dùng trực tiếp CSS design tokens (`var(--surface)`, `var(--surface-2)`, `var(--bg)`, `var(--border)`, `var(--text-1)`, `var(--text-3)`) trong presentation attributes của SVG và HTML classes, phản hồi tức thì khi toggle theme mà không phụ thuộc delay hay hex cố định.

---

## Quy Tắc Bất Khả Xâm Phạm
1. **Nội dung luôn nổi trên hình** (labels/text rendered AFTER hardware shapes in SVG)
2. **Không sử dụng ảnh cá nhân** — chỉ vector kỹ thuật
3. **Tone 07A Light Blueprint là mặc định**, 07B Dark là tùy chọn toggle
4. **HUD chỉ chiếm max `340px`**, không bao giờ che trạm hay specs bar
5. **Lục địa trên globe là chấm điểm** (dot matrix), tuyệt đối không dùng `<path>` fill blob
6. **Chỉ làm việc trong thư mục** `d:\Persional\portfolio`
