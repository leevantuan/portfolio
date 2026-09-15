export const UIResourceVN = {
  resume: 'Tải CV',
  view_architecture: 'Xem Kiến Trúc',
  close: 'Đóng',
  theme_dark: 'Giao diện Tối (07B Dark)',
  theme_light: 'Giao diện Sáng (07A Light)',

  // Navigation
  nav: {
    roadmap: 'Lộ Trình',
    skills: 'Kỹ Năng',
    projects: 'Dự Án',
    experience: 'Kinh Nghiệm',
    credentials: 'Chứng Chỉ',
    contact: 'Liên Hệ',
  },

  // Hero / Greeting Component
  hero_kicker: 'FULL-SPECTRUM ENGINEER · 2Y SYSTEM/NETWORK + 1Y BACKEND DEV',
  header_title: 'Xin chào, tôi là',
  header_name: 'Lê Văn Tuấn',
  header_position: 'Backend Developer & IT System / DevOps Engineer',
  header_description: 'Tôi tốt nghiệp chuyên ngành Kỹ thuật Công nghệ Thông tin, sở hữu 2 năm kinh nghiệm quản trị hạ tầng mạng & hệ thống máy chủ và 1 năm làm Backend Developer chuyên sâu với ASP.NET Core 8 & PostgreSQL. Tôi vận hành xuyên suốt chuỗi giá trị CNTT: từ phần cứng, mạng Cisco/Linux, tự động hóa Cloud/DevOps (Kubernetes, Jenkins, Azure) đến kiến trúc phần mềm phân tán (Microservices, Clean Architecture, CQRS) và ứng dụng Claude AI vào phát triển.',

  // Career Roadmap
  roadmap: {
    kicker: 'CAREER PROGRESSION ROADMAP',
    title: 'Từ IT Mới Ra Trường Đến Solution Architect',
    desc: 'Lộ trình phát triển năng lực qua 6 cấp độ thực chiến: mỗi nấc thang đều được tôi luyện qua hệ thống sản xuất và bảo chứng bởi các chứng chỉ kỹ thuật quốc tế uy tín.',
    current_badge: '● CẤP ĐỘ HIỆN TẠI',
    target_badge: 'MỐC TIẾP THEO — SOLUTION ARCHITECT',
    levels: [
      {
        level: '01',
        title: 'Fresh IT Graduate & Workplace Admin',
        badge: 'FOUNDATION',
        status: 'completed',
        skills: ['Sửa chữa phần cứng PC/Server', 'Windows Client & Mạng LAN', 'Microsoft 365 (Entra ID, Exchange)', 'Khắc phục sự cố thiết bị đầu cuối'],
        desc: 'Nắm vững kiến trúc phần cứng máy tính, quy trình hỗ trợ người dùng và làm chủ quản trị không gian làm việc số trên đám mây Microsoft 365.',
      },
      {
        level: '02',
        title: 'Network & System Administrator',
        badge: '2 NĂM KINH NGHIỆM',
        status: 'completed',
        certs: ['Cisco CCNA', 'Cisco CCNP', 'Linux LPIC-1', 'Linux LPIC-2', 'Windows MCSA'],
        skills: ['Cisco Routing & Switching (VLAN, OSPF, BGP)', 'Linux Administration (RHEL/Ubuntu/CentOS)', 'Windows Server & Active Directory', 'Vẽ sơ đồ mạng & tài liệu hóa kiến trúc'],
        desc: 'Thiết kế, cấu hình và vận hành các hạ tầng mạng doanh nghiệp đa chi nhánh, bảo mật máy chủ trung tâm dữ liệu với độ ổn định 24/7.',
      },
      {
        level: '03',
        title: 'Cloud & DevOps Automation Engineer',
        badge: 'AUTOMATION & CLOUD',
        status: 'completed',
        certs: ['Microsoft Azure AZ-104'],
        skills: ['Microsoft Azure Cloud Services', 'Docker Containerization', 'Kubernetes (K8s) Orchestration', 'CI/CD Pipelines với Jenkins', 'Giám sát Grafana & Prometheus'],
        desc: 'Chuyển dịch hạ tầng lên môi trường Cloud/Container, tự động hóa quy trình triển khai CI/CD và đo kiểm sức khỏe hệ thống theo thời gian thực.',
      },
      {
        level: '04',
        title: 'Backend Software Engineer',
        badge: '1 NĂM DEV THỰC CHIẾN',
        status: 'current',
        skills: ['ASP.NET Core 8 & Clean Architecture', 'Microservices & CQRS', 'Redis Caching & RabbitMQ', 'SignalR Real-time & WebSocket', 'PostgreSQL, MongoDB', 'Data Analysis'],
        desc: 'Thiết kế và lập trình các API chịu tải lớn, áp dụng kiến trúc sạch (Clean Architecture), xử lý giao dịch dữ liệu phân tán và phân tích dữ liệu hiệu năng cao.',
      },
      {
        level: '05',
        title: 'Senior Distributed Systems & AI-Assisted',
        badge: 'HIỆN TẠI · CURRENT LEVEL',
        status: 'current',
        certs: ['English TOEIC', 'Chinese HSK'],
        skills: ['Kiến trúc phân tán chịu tải cao', 'Ứng dụng Claude AI vào phát triển', 'Vẽ bản vẽ kỹ thuật (System Diagramming)', 'Làm việc song ngữ Anh - Trung'],
        desc: 'Tối ưu hóa throughput & độ trễ thấp, tích hợp công nghệ AI/GenAI nhằm gia tăng tốc độ kỹ thuật và cộng tác với các đội ngũ quốc tế.',
      },
      {
        level: '06',
        title: 'Solution Architect',
        badge: 'MỤC TIÊU TIẾP THEO',
        status: 'target',
        skills: ['High Availability & Disaster Recovery (HA/DR)', 'Enterprise Multi-Region Cloud Design', 'Tối ưu hóa chi phí (FinOps) & Bảo mật', 'Kết nối toàn diện Network - DevOps - Business'],
        desc: 'Hoạch định chiến lược công nghệ tổng thể, thiết kế hệ thống cấp doanh nghiệp liên kết thông suốt từ hạ tầng mạng vật lý đến ứng dụng phân tán.',
      },
    ],
  },

  // Observability Widget (Grafana Style)
  observability: {
    kicker: 'HỆ THỐNG GIÁM SÁT THỜI GIAN THỰC (GRAFANA METRICS)',
    uptime_label: 'HỆ THỐNG SẴN SÀNG (UPTIME)',
    uptime_val: '99.98%',
    latency_label: 'ĐỘ TRỄ P95 LATENCY',
    latency_val: '124ms',
    reqs_label: 'LƯU LƯỢNG TRUY VẤN',
    reqs_val: '3.2k req/s',
    exp_label: 'TỔNG KINH NGHIỆM THỰC TẾ',
    exp_val: '2Y INFRA + 1Y DEV',
  },

  // Tech Matrix / Skills Component
  tech_skill: 'Ma Trận Năng Lực Kỹ Thuật (5 Tầng)',
  tech_skill_desc: 'Bao quát toàn diện chuỗi công nghệ từ phần cứng thiết bị, hạ tầng mạng, đám mây DevOps đến tầng ứng dụng backend và AI.',
  tiers: [
    {
      title: '01 / THIẾT BỊ & QUẢN TRỊ VĂN PHÒNG SỐ',
      items: ['Sửa chữa PC & Server', 'Microsoft Entra ID', 'Exchange Online', 'Microsoft 365 Admin', 'Hardware Troubleshooting'],
    },
    {
      title: '02 / MẠNG DOANH NGHIỆP & HỆ ĐIỀU HÀNH MÁY CHỦ',
      items: ['Cisco CCNA', 'Cisco CCNP', 'Linux LPIC-1 / LPIC-2', 'Windows Server MCSA', 'Active Directory', 'System Diagramming'],
    },
    {
      title: '03 / ĐÁM MÂY, DEVOPS & GIÁM SÁT HẠ TẦNG',
      items: ['Microsoft Azure (AZ-104)', 'Kubernetes (K8s)', 'Docker Container', 'CI/CD Jenkins', 'GitHub Actions', 'Grafana / Prometheus'],
    },
    {
      title: '04 / PHÁT TRIỂN BACKEND & XỬ LÝ DỮ LIỆU',
      items: ['ASP.NET Core 8', 'Clean Architecture', 'Microservices', 'CQRS & gRPC', 'PostgreSQL', 'MongoDB', 'Redis', 'RabbitMQ', 'SignalR', 'Data Analysis'],
    },
    {
      title: '05 / CÔNG NGHỆ TƯƠNG LAI & HỢP TÁC QUỐC TẾ',
      items: ['Ứng dụng Claude AI trong lập trình', 'Vẽ sơ đồ kiến trúc vi mạch', 'Tiếng Anh (TOEIC)', 'Tiếng Trung (HSK)'],
    },
  ],

  // Credential Vault
  credentials_title: 'Kho Chứng Chỉ Quốc Tế (Credential Vault)',
  credentials_desc: 'Toàn bộ các kỹ năng cốt lõi đều được kiểm chứng độc lập qua các chứng chỉ kỹ thuật quốc tế danh giá.',
  credentials: [
    { name: 'CCNA', issuer: 'Cisco Systems', code: 'CISCO-CCNA', category: 'Networking' },
    { name: 'CCNP', issuer: 'Cisco Systems', code: 'CISCO-CCNP', category: 'Networking' },
    { name: 'LPIC-1', issuer: 'Linux Professional Institute', code: 'LPI-LPIC-1', category: 'Linux Server' },
    { name: 'LPIC-2', issuer: 'Linux Professional Institute', code: 'LPI-LPIC-2', category: 'Linux Engineer' },
    { name: 'MCSA', issuer: 'Microsoft Corporation', code: 'MS-MCSA', category: 'Windows Server' },
    { name: 'AZ-104', issuer: 'Microsoft Azure Administrator', code: 'MS-AZ-104', category: 'Cloud Infrastructure' },
    { name: 'TOEIC', issuer: 'ETS — English Proficiency', code: 'ETS-TOEIC', category: 'Language' },
    { name: 'HSK', issuer: 'Chinese Proficiency Test', code: 'CTI-HSK', category: 'Language' },
  ],

  // Experience Component
  experience_experience: 'Kinh Nghiệm Thực Chiến',
  experience_list: [
    {
      role: 'IT System & Network Engineer',
      company: 'Enterprise Infrastructure & Network Services',
      period: '2 Năm',
      tags: ['Cisco Routing/Switching', 'Linux RHEL/Ubuntu', 'Windows Server', 'Active Directory', 'Microsoft 365', 'System Diagramming'],
      desc: 'Quản trị toàn diện hạ tầng mạng LAN/WAN đa chi nhánh, cấu hình router/switch Cisco, quản trị cụm máy chủ Linux và Windows Server, triển khai Microsoft 365 (Entra ID, Exchange Online) và tài liệu hóa sơ đồ mạng cho toàn bộ tổ chức.',
    },
    {
      role: 'Lập trình viên Backend (ASP.NET Core)',
      company: 'Sunshine Software',
      period: '1 Năm',
      tags: ['ASP.Net Core 8', 'Clean Architecture', 'PostgreSQL', 'SQL Server', 'Redis Caching', 'IIS Server'],
      desc: 'Thiết kế, xây dựng và tối ưu hệ thống backend doanh nghiệp theo kiến trúc Clean Architecture, tối ưu hóa câu truy vấn cơ sở dữ liệu quy mô lớn, tích hợp Redis caching giảm 60% thời gian phản hồi và phối hợp chặt chẽ với khách hàng để phát triển tính năng mới.',
    },
  ],

  // Projects Component
  project_project: 'Dự Án Kỹ Thuật Tiêu Biểu',
  projects: [
    {
      number: '01 / PROJECT',
      name: 'Hệ Thống Quản Lý Sân Cầu Lông',
      status: '● COMPLETED',
      status_type: 'completed',
      tags: ['ASP.Net Core 8', 'Multi Tenancy', 'Clean Architecture', 'PostgreSQL', 'Redis', 'RabbitMQ', 'SignalR', 'Docker', 'CI/CD'],
      desc: 'Xây dựng hệ thống backend mở rộng với ASP.NET Core Web API theo Clean Architecture và PostgreSQL hỗ trợ kiến trúc đa người thuê (Multi-tenancy). Tích hợp Redis đệm dữ liệu, SignalR cho đặt lịch và trao đổi thời gian thực, JWT xác thực và cổng thanh toán. Đóng gói Docker và tự động hóa triển khai bằng CI/CD.',
    },
    {
      number: '02 / PROJECT',
      name: 'Hệ Thống Quản Lý Quán Coffee (Microservices)',
      status: '● BUILDING',
      status_type: 'building',
      tags: ['Microservices', 'Clean Architecture', 'Distributed Systems', 'ASP.Net Core 8', 'PostgreSQL', 'MongoDB', 'Redis', 'RabbitMQ', 'Docker', 'CI/CD'],
      desc: 'Xây dựng hệ thống backend phân tán mô hình Microservices kết hợp Clean Architecture, sử dụng kết hợp PostgreSQL và MongoDB. Áp dụng CQRS, gRPC, Message Queue với RabbitMQ điều phối đơn hàng và SignalR cập nhật trạng thái bếp tức thời.',
    },
    {
      number: '03 / PROJECT',
      name: 'Cloud Architecture & DevOps Lab',
      status: '● LIVE DEMO',
      status_type: 'completed',
      tags: ['Microsoft Azure', 'Kubernetes (K8s)', 'Docker', 'Jenkins CI/CD', 'Grafana', 'Prometheus'],
      desc: 'Môi trường lab thực nghiệm kiến trúc đám mây Azure kết hợp điều phối container Kubernetes, tích hợp đường ống CI/CD tự động bằng Jenkins và bảng điều khiển giám sát tài nguyên máy chủ với Grafana / Prometheus.',
    },
  ],

  // System Architecture Diagram Viewer
  diagram: {
    title: 'Bản Vẽ Kiến Trúc Hệ Thống (System Architecture Blueprint)',
    subtitle: 'Mô hình Microservices Phân Tán & Hạ Tầng Azure Kubernetes (K8s)',
    api_gateway: 'API Gateway (Ocelot / YARP)',
    auth_service: 'Auth & Identity Service (JWT / Entra ID)',
    order_service: 'Order Microservice (CQRS / .NET 8)',
    booking_service: 'Booking Microservice (SignalR / Real-time)',
    message_bus: 'Message Bus (RabbitMQ Cluster)',
    cache_layer: 'Distributed Cache (Redis Sentinel)',
    db_layer: 'Database Layer (PostgreSQL & MongoDB)',
    monitoring: 'Observability & Monitoring (Grafana + Prometheus)',
  },

  // Contact Component
  contact_contact: 'Liên Hệ',
  contact_titleContact: 'Kết nối để thảo luận cơ hội hợp tác và kiến trúc hệ thống',
  contact_email: 'levantuan.work@gmail.com',
  contact_nameContact: 'Họ và tên',
  contact_emailContact: 'Email',
  contact_messageContact: 'Nội dung tin nhắn',
  contact_sendContact: 'Gửi tin nhắn ngay',

  // Footer
  footer: '© 2026 Lê Văn Tuấn · dev·archive. Tất cả các quyền được bảo lưu. Technical Blueprint Tone 07.',
};
