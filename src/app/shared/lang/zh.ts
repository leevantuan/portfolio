export const UIResourceZH = {
  resume: '下载简历',
  view_architecture: '查看系统架构',
  close: '关闭',
  theme_dark: '暗色控制台 (07B Dark)',
  theme_light: '明色技术蓝图 (07A Light)',

  // Navigation
  nav: {
    roadmap: '职业路线',
    skills: '技术矩阵',
    projects: '实战项目',
    experience: '工作经历',
    credentials: '认证证书',
    contact: '联系方式',
  },

  // Hero / Greeting Component
  hero_kicker: '全栈全链路工程师 · 2年系统与网络 + 1年后端口开发',
  header_title: '你好，我是',
  header_name: 'Lê Văn Tuấn (黎文俊)',
  header_position: '后端开发工程师 & IT 系统 / DevOps 运维工程师',
  header_description: '拥有信息技术工程学位，拥有2年网络基础设施与服务器系统管理经验，以及1年基于 ASP.NET Core 8 和 PostgreSQL 的高性能后端开发经验。我的工作贯穿IT全链路：从物理硬件、Cisco/Linux 网络、云与容器自动化（Kubernetes、Jenkins、Azure），到分布式微服务架构（Clean Architecture、CQRS），并将 Claude AI 深度融入工程提效中。',

  // Career Roadmap
  roadmap: {
    kicker: 'CAREER PROGRESSION ROADMAP',
    title: '从 IT 新人到解决方案架构师 (Solution Architect)',
    desc: '系统化六阶成长路线图：每一个里程碑均在生产环境中锤炼，并获得国际权威认证证书的专业背书。',
    current_badge: '● 当前所处阶段',
    target_badge: '下一个目标里程碑 — 解决方案架构师',
    levels: [
      {
        level: '01',
        title: 'IT 毕业生与企业办公运维',
        badge: '基础夯实',
        status: 'completed',
        skills: ['PC与服务器硬件维修', 'Windows客户端与局域网运维', 'Microsoft 365 (Entra ID, Exchange)', '终端设备故障排查'],
        desc: '深入掌握计算机体系结构、硬件诊断流程、企业数字化办公环境搭建及 Microsoft 365 云上身份管理。',
      },
      {
        level: '02',
        title: '网络与系统管理员 (Network & Sysadmin)',
        badge: '2年实战经验',
        status: 'completed',
        certs: ['Cisco CCNA', 'Cisco CCNP', 'Linux LPIC-1', 'Linux LPIC-2', 'Windows MCSA'],
        skills: ['Cisco 路由与交换 (VLAN, OSPF, BGP)', 'Linux 运维管理 (RHEL/Ubuntu/CentOS)', 'Windows Server 与活动目录 (AD)', '网络拓扑与架构图绘制'],
        desc: '设计、配置并稳定运维跨分支机构的企业级网络与高可用数据中心服务器基础设施，保障业务 24/7 零故障运行。',
      },
      {
        level: '03',
        title: '云平台与 DevOps 自动化工程师',
        badge: '自动化与云化',
        status: 'completed',
        certs: ['Microsoft Azure AZ-104'],
        skills: ['Microsoft Azure 云计算服务', 'Docker 容器化封装', 'Kubernetes (K8s) 集群编排', 'Jenkins 自动化 CI/CD 流水线', 'Grafana 与 Prometheus 可观测性'],
        desc: '主导基础设施云化转型与容器化改造，实现全流程 CI/CD 自动化交付，并构建实时系统性能监控预警体系。',
      },
      {
        level: '04',
        title: '后端软件工程师 (Backend Software Engineer)',
        badge: '1年生产级开发',
        status: 'current',
        skills: ['ASP.NET Core 8 与清晰架构 (Clean Arch)', '微服务与 CQRS 架构模式', 'Redis 内存缓存与 RabbitMQ 消息队列', 'SignalR 实时通信', 'PostgreSQL, MongoDB', '数据分析'],
        desc: '负责高并发后端 API 的设计与研发，运用 Clean Architecture 与多租户模式，精通分布式事务与大规模数据处理。',
      },
      {
        level: '05',
        title: '高级分布式系统与 AI 辅助工程',
        badge: '当前主攻方向',
        status: 'current',
        certs: ['英语 TOEIC', '汉语水平考试 HSK'],
        skills: ['高吞吐低延迟分布式架构', '深度应用 Claude AI 进行工程研发', '系统蓝图与架构设计绘图', '中英双语国际化协作'],
        desc: '钻研高韧性分布式架构设计，利用生成式 AI 技术加速系统原型与代码开发，具备流畅的中英双语技术交流能力。',
      },
      {
        level: '06',
        title: '解决方案架构师 (Solution Architect)',
        badge: '未来愿景目标',
        status: 'target',
        skills: ['高可用与异地容灾架构 (HA/DR)', '企业级跨区域混合云规划', 'FinOps 成本优化与零信任安全', '贯通网络、DevOps 与商业价值'],
        desc: '未来愿景：制定企业级全栈技术战略，从底层物理网络设施到顶层云原生微服务，实现无缝衔接的一体化解决方案。',
      },
    ],
  },

  // Observability Widget (Grafana Style)
  observability: {
    kicker: '实时系统指标可观测体系 (GRAFANA METRICS)',
    uptime_label: '系统可用率 (UPTIME)',
    uptime_val: '99.98%',
    latency_label: 'P95 响应延迟',
    latency_val: '124ms',
    reqs_label: '实时请求吞吐量',
    reqs_val: '3.2k req/s',
    exp_label: '综合工程实战经验',
    exp_val: '2年运维 + 1年开发',
  },

  // Tech Matrix / Skills Component
  tech_skill: '五层全栈技术能力矩阵 (Tech Matrix)',
  tech_skill_desc: '纵贯端到端技术链条：涵盖硬件设备、网络路由、云原生 DevOps、分布式后端应用以及前沿 AI 技术。',
  tiers: [
    {
      title: '01 / 终端硬件与数字化办公管理',
      items: ['PC与服务器硬件维修', 'Microsoft Entra ID', 'Exchange Online', 'Microsoft 365 运维', '硬件故障排查'],
    },
    {
      title: '02 / 企业网络与核心系统运维',
      items: ['Cisco CCNA', 'Cisco CCNP', 'Linux LPIC-1 / LPIC-2', 'Windows Server MCSA', '活动目录 (AD)', '系统架构图绘制'],
    },
    {
      title: '03 / 云计算、DEVOPS 与监控体系',
      items: ['Microsoft Azure (AZ-104)', 'Kubernetes (K8s)', 'Docker 容器', 'Jenkins CI/CD', 'GitHub Actions', 'Grafana / Prometheus'],
    },
    {
      title: '04 / 后端应用开发与数据处理',
      items: ['ASP.NET Core 8', 'Clean Architecture', '微服务 (Microservices)', 'CQRS & gRPC', 'PostgreSQL', 'MongoDB', 'Redis', 'RabbitMQ', 'SignalR', '数据分析'],
    },
    {
      title: '05 / 进阶工程技术与国际化协作',
      items: ['Claude AI 辅助工程落地', '系统蓝图绘制', '英语 (TOEIC)', '汉语 (HSK)'],
    },
  ],

  // Credential Vault
  credentials_title: '国际权威认证库 (Credential Vault)',
  credentials_desc: '所有核心工程素养均获得国际知名权威技术机构的独立认证考核。',
  credentials: [
    { name: 'CCNA', issuer: 'Cisco Systems', code: 'CISCO-CCNA', category: '网络工程' },
    { name: 'CCNP', issuer: 'Cisco Systems', code: 'CISCO-CCNP', category: '高级网络' },
    { name: 'LPIC-1', issuer: 'Linux Professional Institute', code: 'LPI-LPIC-1', category: 'Linux 系统' },
    { name: 'LPIC-2', issuer: 'Linux Professional Institute', code: 'LPI-LPIC-2', category: 'Linux 高级' },
    { name: 'MCSA', issuer: 'Microsoft Corporation', code: 'MS-MCSA', category: 'Windows 服务' },
    { name: 'AZ-104', issuer: 'Microsoft Azure Administrator', code: 'MS-AZ-104', category: '云基础设施' },
    { name: 'TOEIC', issuer: 'ETS — 托业英语', code: 'ETS-TOEIC', category: '商务英语' },
    { name: 'HSK', issuer: '中外语言交流合作中心 (汉考国际)', code: 'CTI-HSK', category: '汉语水平' },
  ],

  // Experience Component
  experience_experience: '生产环境工作实战',
  experience_list: [
    {
      role: 'IT 系统与网络运维工程师',
      company: '企业级基础设施与网络运维服务',
      period: '2 年',
      tags: ['Cisco 路由/交换', 'Linux RHEL/Ubuntu', 'Windows Server', 'Active Directory', 'Microsoft 365', '架构拓扑图'],
      desc: '全面负责多园区企业级局域网与广域网运维，配置 Cisco 交换机与路由器，保障 Linux 与 Windows 集群稳定运行，主导 Microsoft 365 上云部署并编写全套系统拓扑与运维规范。',
    },
    {
      role: '后端软件开发工程师',
      company: 'Sunshine Software (阳光软件)',
      period: '1 年',
      tags: ['ASP.Net Core 8', 'Clean Architecture', 'PostgreSQL', 'SQL Server', 'Redis 缓存', 'IIS Server'],
      desc: '基于 Clean Architecture 架构主导企业级后端服务研发，深度优化复杂 SQL 查询性能，引入 Redis 缓存将核心接口响应耗时降低 60%，并与跨职能团队高效协作交付核心功能。',
    },
  ],

  // Projects Component
  project_project: '精选代表性技术工程',
  projects: [
    {
      number: '01 / PROJECT',
      name: '羽毛球场馆智能综合管理系统',
      status: '● 已上线 COMPLETED',
      status_type: 'completed',
      tags: ['ASP.Net Core 8', '多租户架构', 'Clean Architecture', 'PostgreSQL', 'Redis', 'RabbitMQ', 'SignalR', 'Docker', 'CI/CD'],
      desc: '基于 ASP.NET Core Web API 与 PostgreSQL 构建的高并发多租户系统。集成 Redis 缓存、SignalR 毫秒级实时场地预约与消息通知、JWT 鉴权及在线安全支付网关，全面支持 Docker 容器化与 CI/CD 自动化部署。',
    },
    {
      number: '02 / PROJECT',
      name: '连锁咖啡门店智能管理微服务平台',
      status: '● 研发中 BUILDING',
      status_type: 'building',
      tags: ['微服务', 'Clean Architecture', '分布式系统', 'ASP.Net Core 8', 'PostgreSQL', 'MongoDB', 'Redis', 'RabbitMQ', 'Docker', 'CI/CD'],
      desc: '采用微服务与清晰架构结合的前沿分布式平台，融合关系型 PostgreSQL 与文档型 MongoDB。运用 CQRS 与 gRPC 通信，通过 RabbitMQ 消息总线异步解耦订单工作流，实现厨房屏端实时状态同步。',
    },
    {
      number: '03 / PROJECT',
      name: 'Cloud 云架构与 DevOps 自动化实验平台',
      status: '● 在线演示 LIVE DEMO',
      status_type: 'completed',
      tags: ['Microsoft Azure', 'Kubernetes (K8s)', 'Docker', 'Jenkins CI/CD', 'Grafana', 'Prometheus'],
      desc: '模拟企业级混合云生产环境实验平台，运行于 Azure Kubernetes 集群之上，打通 Jenkins 自动化持续集成交付管道，并基于 Grafana + Prometheus 打造全链路监控告警大盘。',
    },
  ],

  // System Architecture Diagram Viewer
  diagram: {
    title: '系统架构工程设计蓝图 (System Architecture Blueprint)',
    subtitle: '分布式微服务架构与 Azure Kubernetes (K8s) 基础设施',
    api_gateway: 'API 网关 (Ocelot / YARP)',
    auth_service: '认证与鉴权中心 (JWT / Entra ID)',
    order_service: '订单微服务集群 (CQRS / .NET 8)',
    booking_service: '预订微服务 (SignalR 实时通信)',
    message_bus: '分布式事件总线 (RabbitMQ Cluster)',
    cache_layer: '分布式缓存层 (Redis Sentinel)',
    db_layer: '持久化数据层 (PostgreSQL & MongoDB)',
    monitoring: '可观测性监控大盘 (Grafana + Prometheus)',
  },

  // Contact Component
  contact_contact: '联系我',
  contact_titleContact: '期待与您就技术架构、系统工程或职业机遇展开深入交流',
  contact_email: 'levantuan.work@gmail.com',
  contact_nameContact: '您的姓名',
  contact_emailContact: '电子邮箱',
  contact_messageContact: '留言详情',
  contact_sendContact: '即刻发送消息',

  // Footer
  footer: '© 2026 Lê Văn Tuấn (黎文俊) · dev·archive. 保留所有权利。Technical Blueprint Tone 07.',
};
