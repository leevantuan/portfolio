export const UIResourceENG = {
  resume: 'Download CV',
  view_architecture: 'View Architecture',
  close: 'Close',
  theme_dark: 'Dark Console (07B Dark)',
  theme_light: 'Light Blueprint (07A Light)',

  // Navigation
  nav: {
    roadmap: 'Roadmap',
    skills: 'Skills',
    projects: 'Projects',
    experience: 'Experience',
    credentials: 'Credentials',
    contact: 'Contact',
  },

  // Hero / Greeting Component
  hero_kicker: 'FULL-SPECTRUM ENGINEER · 2Y SYSTEM/NETWORK + 1Y BACKEND DEV',
  header_title: "Hi there, I'm",
  header_name: 'Le Van Tuan',
  header_position: 'Backend Developer & IT System / DevOps Engineer',
  header_description: 'Information Technology graduate with 2 years of experience managing enterprise network & server infrastructure, and 1 year as a Backend Developer specializing in ASP.NET Core 8 & PostgreSQL. I operate across the full IT value chain: from hardware and Cisco/Linux networking, cloud/DevOps automation (Kubernetes, Jenkins, Azure) to distributed software architecture (Microservices, Clean Architecture, CQRS) and accelerating engineering workflows with Claude AI.',

  // Career Roadmap
  roadmap: {
    kicker: 'CAREER PROGRESSION ROADMAP',
    title: 'From Fresh IT Graduate to Solution Architect',
    desc: 'A systematic 6-tier progression: every milestone forged in production environments and certified by internationally recognized credentials.',
    current_badge: '● CURRENT LEVEL',
    target_badge: 'NEXT TARGET — SOLUTION ARCHITECT',
    levels: [
      {
        level: '01',
        title: 'Fresh IT Graduate & Workplace Admin',
        badge: 'FOUNDATION',
        status: 'completed',
        skills: ['PC & Server Hardware Repair', 'Windows Client & LAN Networking', 'Microsoft 365 (Entra ID, Exchange)', 'Endpoint Troubleshooting'],
        desc: 'Mastered computer architecture, hardware diagnostics, user support lifecycles, and modern enterprise cloud workplace administration via Microsoft 365.',
      },
      {
        level: '02',
        title: 'Network & System Administrator',
        badge: '2 YEARS EXPERIENCE',
        status: 'completed',
        certs: ['Cisco CCNA', 'Cisco CCNP', 'Linux LPIC-1', 'Linux LPIC-2', 'Windows MCSA'],
        skills: ['Cisco Routing & Switching (VLAN, OSPF, BGP)', 'Linux Administration (RHEL/Ubuntu/CentOS)', 'Windows Server & Active Directory', 'Network Topology & Diagramming'],
        desc: 'Designed, configured, and operated multi-branch enterprise networks and high-availability datacenter servers with 24/7 reliability.',
      },
      {
        level: '03',
        title: 'Cloud & DevOps Automation Engineer',
        badge: 'AUTOMATION & CLOUD',
        status: 'completed',
        certs: ['Microsoft Azure AZ-104'],
        skills: ['Microsoft Azure Cloud Services', 'Docker Containerization', 'Kubernetes (K8s) Orchestration', 'CI/CD Pipelines with Jenkins', 'Grafana & Prometheus Observability'],
        desc: 'Migrated infrastructure to containerized cloud environments, automated end-to-end CI/CD delivery pipelines, and engineered real-time metrics telemetry.',
      },
      {
        level: '04',
        title: 'Backend Software Engineer',
        badge: '1 YEAR PRODUCTION DEV',
        status: 'current',
        skills: ['ASP.NET Core 8 & Clean Architecture', 'Microservices & CQRS', 'Redis Caching & RabbitMQ', 'SignalR Real-time & WebSocket', 'PostgreSQL, MongoDB', 'Data Analysis'],
        desc: 'Engineered high-throughput backend APIs with Clean Architecture, managed distributed transactions, asynchronous message brokers, and multi-tenant architectures.',
      },
      {
        level: '05',
        title: 'Senior Distributed Systems & AI-Assisted',
        badge: 'CURRENT SPECIALIZATION',
        status: 'current',
        certs: ['English TOEIC', 'Chinese HSK'],
        skills: ['High-Throughput & Low-Latency Systems', 'Claude AI / GenAI for Rapid Engineering', 'System Diagramming & Blueprints', 'Bilingual Collaboration (ENG / ZH)'],
        desc: 'Specializing in resilient distributed patterns, adopting state-of-the-art AI tooling for rapid system analysis and collaborating in international environments.',
      },
      {
        level: '06',
        title: 'Solution Architect',
        badge: 'NEXT MILESTONE',
        status: 'target',
        skills: ['High Availability & Disaster Recovery (HA/DR)', 'Enterprise Multi-Region Cloud Design', 'FinOps Cost Optimization & Zero-Trust', 'Bridging Network, DevOps & Business'],
        desc: 'Formulating end-to-end technology blueprints for enterprise systems, creating seamless continuity from physical network cables to cloud-native microservices.',
      },
    ],
  },

  // Observability Widget (Grafana Style)
  observability: {
    kicker: 'REAL-TIME OBSERVABILITY (GRAFANA METRICS)',
    uptime_label: 'SYSTEM UPTIME',
    uptime_val: '99.98%',
    latency_label: 'P95 LATENCY',
    latency_val: '124ms',
    reqs_label: 'QUERY THROUGHPUT',
    reqs_val: '3.2k req/s',
    exp_label: 'COMBINED EXPERIENCE',
    exp_val: '2Y INFRA + 1Y DEV',
  },

  // Tech Matrix / Skills Component
  tech_skill: 'Full-Spectrum Technical Matrix (5 Layers)',
  tech_skill_desc: 'Comprehensive engineering coverage spanning physical hardware, network routing, cloud DevOps, distributed backend architectures, and AI craft.',
  tiers: [
    {
      title: '01 / HARDWARE & WORKPLACE ADMINISTRATION',
      items: ['PC & Server Hardware', 'Microsoft Entra ID', 'Exchange Online', 'Microsoft 365 Admin', 'Hardware Troubleshooting'],
    },
    {
      title: '02 / ENTERPRISE NETWORKING & CORE SYSADMIN',
      items: ['Cisco CCNA', 'Cisco CCNP', 'Linux LPIC-1 / LPIC-2', 'Windows Server MCSA', 'Active Directory', 'System Diagramming'],
    },
    {
      title: '03 / CLOUD, DEVOPS & OBSERVABILITY',
      items: ['Microsoft Azure (AZ-104)', 'Kubernetes (K8s)', 'Docker Containers', 'Jenkins CI/CD', 'GitHub Actions', 'Grafana / Prometheus'],
    },
    {
      title: '04 / BACKEND DEVELOPMENT & DATA PROCESSING',
      items: ['ASP.NET Core 8', 'Clean Architecture', 'Microservices', 'CQRS & gRPC', 'PostgreSQL', 'MongoDB', 'Redis', 'RabbitMQ', 'SignalR', 'Data Analysis'],
    },
    {
      title: '05 / ADVANCED CRAFT & INTERNATIONAL COLLABORATION',
      items: ['Claude AI Engineering Workflows', 'Architecture Blueprinting', 'English (TOEIC)', 'Chinese (HSK)'],
    },
  ],

  // Credential Vault
  credentials_title: 'Credential Vault (International Certifications)',
  credentials_desc: 'All core competencies are independently verified by prestigious international certification bodies.',
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
  experience_experience: 'Production Experience',
  experience_list: [
    {
      role: 'IT System & Network Engineer',
      company: 'Enterprise Infrastructure & Network Services',
      period: '2 Years',
      tags: ['Cisco Routing/Switching', 'Linux RHEL/Ubuntu', 'Windows Server', 'Active Directory', 'Microsoft 365', 'System Diagramming'],
      desc: 'Administered multi-branch enterprise LAN/WAN network infrastructures, configured Cisco routers and switches, maintained Linux/Windows Server clusters, deployed Microsoft 365 (Entra ID, Exchange Online), and produced comprehensive system topology diagrams.',
    },
    {
      role: 'Backend Software Developer',
      company: 'Sunshine Software',
      period: '1 Year',
      tags: ['ASP.Net Core 8', 'Clean Architecture', 'PostgreSQL', 'SQL Server', 'Redis Caching', 'IIS Server'],
      desc: 'Architected and optimized backend services following Clean Architecture principles, fine-tuned high-volume database queries, integrated Redis caching reducing response latency by 60%, and collaborated closely with clients to deliver core business features.',
    },
  ],

  // Projects Component
  project_project: 'Featured Technical Projects',
  projects: [
    {
      number: '01 / PROJECT',
      name: 'Badminton Court Management System',
      status: '● COMPLETED',
      status_type: 'completed',
      tags: ['ASP.Net Core 8', 'Multi Tenancy', 'Clean Architecture', 'PostgreSQL', 'Redis', 'RabbitMQ', 'SignalR', 'Docker', 'CI/CD'],
      desc: 'Engineered a scalable multi-tenant backend with ASP.NET Core Web API and PostgreSQL. Integrated Redis for data caching, SignalR for real-time bookings, JWT authentication, and automated payment gateways. Packaged via Docker and deployed with automated CI/CD pipelines.',
    },
    {
      number: '02 / PROJECT',
      name: 'Coffee Shop Management Platform (Microservices)',
      status: '● BUILDING',
      status_type: 'building',
      tags: ['Microservices', 'Clean Architecture', 'Distributed Systems', 'ASP.Net Core 8', 'PostgreSQL', 'MongoDB', 'Redis', 'RabbitMQ', 'Docker', 'CI/CD'],
      desc: 'Distributed microservices architecture utilizing Clean Architecture, blending relational PostgreSQL with document-based MongoDB. Features CQRS, gRPC, RabbitMQ event bus for order coordination, and SignalR live kitchen displays.',
    },
    {
      number: '03 / PROJECT',
      name: 'Cloud Architecture & DevOps Lab',
      status: '● LIVE DEMO',
      status_type: 'completed',
      tags: ['Microsoft Azure', 'Kubernetes (K8s)', 'Docker', 'Jenkins CI/CD', 'Grafana', 'Prometheus'],
      desc: 'Experimental laboratory simulating Azure cloud infrastructure orchestrated by Kubernetes, continuous automated delivery with Jenkins pipelines, and complete observability with Grafana and Prometheus monitoring.',
    },
  ],

  // System Architecture Diagram Viewer
  diagram: {
    title: 'System Architecture Blueprint',
    subtitle: 'Distributed Microservices & Azure Kubernetes (K8s) Infrastructure',
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
  contact_contact: 'Contact',
  contact_titleContact: 'Get in touch to discuss collaboration and architecture opportunities',
  contact_email: 'levantuan.work@gmail.com',
  contact_nameContact: 'Your name',
  contact_emailContact: 'Email address',
  contact_messageContact: 'Message content',
  contact_sendContact: 'Send message now',

  // Footer
  footer: '© 2026 Le Van Tuan · dev·archive. All rights reserved. Technical Blueprint Tone 07.',
};
