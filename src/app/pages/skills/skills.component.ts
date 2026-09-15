import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  SimpleChanges,
} from '@angular/core';
import { UIResourceENG } from '../../shared/lang/eng';
import { UIResourceVN } from '../../shared/lang/vn';
import { UIResourceZH } from '../../shared/lang/zh';

export interface AiLogMessage {
  sender: string;
  senderRole: string;
  badgeColor: string;
  text: string;
  codeSnippet?: string;
  type: 'directive' | 'critique' | 'mcp' | 'test' | 'build' | 'security' | 'deploy' | 'operate';
}

export interface AiStepDetail {
  step: number;
  title: string;
  shortName: string;
  leadAi: string;
  role: string;
  statusBadge: string;
  statusColor: string;
  description: string;
  logs: AiLogMessage[];
}

export interface ConvergenceMetric {
  label: string;
  value: string;
  sub: string;
}

export interface ConvergenceSynergy {
  partnerDomain: string;
  partnerNum: string;
  title: string;
  description: string;
  protocol: string;
}

export interface ConvergenceDomain {
  id: '01' | '02' | '03' | '04' | 'ai';
  num: string;
  title: string;
  shortTitle: string;
  categoryBadge: string;
  accentColor: string;
  headline: string;
  coreSkills: string[];
  operationalRole: string;
  metrics: ConvergenceMetric[];
  synergies: ConvergenceSynergy[];
  aiSupercharge: string;
}

export interface ScenarioStep {
  domainNum: string;
  domainName: string;
  badgeColor: string;
  action: string;
  telemetry: string;
  status: string;
}

export interface ConvergenceScenario {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  description: string;
  totalTime: string;
  steps: ScenarioStep[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() lang: string = 'VI';

  UIResource: any = UIResourceVN;

  // Tabs for interactive terminals & visualizations
  activeLinuxTab: 'tree' | 'systemctl' | 'neofetch' = 'tree';
  activeCiscoTab: 'topology' | 'routes' | 'vlan' = 'topology';
  activeDevOpsTab: 'pipeline' | 'kubectl' = 'pipeline';
  activeBackendTab: 'flow' | 'code' = 'flow';

  // 8-Phase AI Engineering Orchestrator State
  currentAiStep: number = 1;
  isAiSimulating: boolean = false;
  private aiSimulationTimer: any = null;

  // Grand Convergence Ecosystem State
  selectedConvergenceTab: 'all' | '01' | '02' | '03' | '04' | 'ai' = 'all';
  activeScenarioIndex: number = 0;
  activeScenarioStepIdx: number = 0;
  isScenarioAutoPlaying: boolean = false;
  private scenarioTimer: any = null;

  // Typewriter state for Section 01 & 02
  linuxTypedCmd: string = '';
  linuxFullCmd: string = 'tree -C --dirsfirst /infrastructure/skills/';
  isLinuxTypingDone: boolean = false;
  private linuxTypeTimer: any = null;

  ciscoTypedCmd: string = '';
  ciscoFullCmd: string = 'show network-topology';
  isCiscoTypingDone: boolean = false;
  private ciscoTypeTimer: any = null;

  private observer: IntersectionObserver | null = null;

  // 8-Phase Engineering Lifecycle Data Model
  aiSteps: AiStepDetail[] = [
    {
      step: 1,
      title: '01. DISCOVER & REQUIREMENT ANALYSIS',
      shortName: 'DISCOVER',
      leadAi: 'Researcher Agent (Gemini 2.0 & ChatGPT)',
      role: 'Context Research & Scope Boundary',
      statusBadge: 'SRS VERIFIED',
      statusColor: '#38BDF8',
      description: 'Nghiên cứu yêu cầu nghiệp vụ, tra cứu 1M+ token tài liệu RFC, audit hiện trạng codebase, xác định ranh giới tính năng và kiểm tra phụ thuộc kỹ thuật.',
      logs: [
        {
          sender: 'Researcher Subagent',
          senderRole: 'Requirement Engineering',
          badgeColor: '#38BDF8',
          text: 'Tiếp nhận bài toán: Nâng cấp luồng thanh toán và xử lý đơn hàng chịu tải phân tán 10,000 req/s không gián đoạn.',
          type: 'directive',
        },
        {
          sender: 'Gemini 2.0 (Context Engine)',
          senderRole: 'Deep Codebase & RFC Scan',
          badgeColor: '#F59E0B',
          text: 'Quét 120 trang tài liệu RFC, schema database cũ và JWT auth specs: Xác nhận ranh giới microservice và cơ chế phân quyền.',
          type: 'critique',
        },
        {
          sender: 'Filesystem MCP',
          senderRole: 'Workspace Inspection',
          badgeColor: '#7ED957',
          text: 'Hoàn tất trích xuất cấu trúc dự án hiện hữu. Bàn giao dữ liệu bối cảnh (Context Pack) sang Architect Agent.',
          type: 'mcp',
        },
      ],
    },
    {
      step: 2,
      title: '02. ARCHITECT & SYSTEM BLUEPRINTING',
      shortName: 'ARCHITECT',
      leadAi: 'Claude 3.7 (Thinking) & ChatGPT',
      role: 'Lead System Architect',
      statusBadge: 'BLUEPRINT SIGNED',
      statusColor: '#7ED957',
      description: 'Thiết kế kiến trúc phân tán Clean Architecture, CQRS & MediatR, cấu trúc RabbitMQ Topic Exchange, mô hình dữ liệu PostgreSQL + Redis, và sizing hạ tầng Azure AKS.',
      logs: [
        {
          sender: 'Claude (Lead Architect)',
          senderRole: 'Distributed System Design',
          badgeColor: '#7ED957',
          text: 'Thiết lập Blueprint: Ingress Nginx (TLS 1.3) → ASP.NET Core 8 Web API → RabbitMQ Topic Exchange → Worker Consumers → PostgreSQL ACID + Redis Cache.',
          type: 'directive',
        },
        {
          sender: 'ChatGPT (Adversarial Critic)',
          senderRole: 'Risk & Edge-Case Review',
          badgeColor: '#38BDF8',
          text: 'Phản biện: Cảnh báo nguy cơ Duplicate Order khi mạng chập chờn giữa Message Bus và Database. Yêu cầu thêm Outbox Pattern.',
          type: 'critique',
        },
        {
          sender: 'Claude (Lead Architect)',
          senderRole: 'Self-Correction & Prompts',
          badgeColor: '#7ED957',
          text: 'Self-Correction hoàn tất: Tích hợp Transactional Outbox & Idempotent Consumer vào System Directive. Sinh System Prompts cho Coder.',
          type: 'directive',
        },
      ],
    },
    {
      step: 3,
      title: '03. IMPLEMENTATION & CODE SYNTHESIS',
      shortName: 'IMPLEMENT',
      leadAi: 'Claude Code CLI & Coding Subagents',
      role: 'Hands-on Synthesizer (MCP Enabled)',
      statusBadge: 'CODE SYNTHESIZED',
      statusColor: '#F59E0B',
      description: 'Claude Code kết nối các công cụ MCP (Git, Database, Filesystem, Terminal) tạo nhánh feature, sinh mã nguồn C# .NET 8, cấu hình Entity Framework và Kubernetes YAML.',
      logs: [
        {
          sender: 'Claude Code CLI',
          senderRole: 'MCP Git Tool',
          badgeColor: '#F59E0B',
          text: 'Thực thi lệnh: git checkout -b feature/event-driven-orders',
          type: 'mcp',
        },
        {
          sender: 'Claude Code CLI',
          senderRole: 'Code Generation',
          badgeColor: '#F59E0B',
          text: 'Sinh mã nguồn hoàn chỉnh: CreateOrderCommandHandler.cs (CQRS + MediatR + FluentValidation + Redis Cache).',
          codeSnippet: 'public async Task<OrderResponse> Handle(CreateOrderCommand cmd, CancellationToken ct) { ... }',
          type: 'mcp',
        },
        {
          sender: 'Claude Code CLI',
          senderRole: 'Infrastructure as Code',
          badgeColor: '#F59E0B',
          text: 'Khởi tạo k8s-deployment.yaml và Helm values cấu hình CPU Limits 500m, Memory 1Gi trên Azure AKS.',
          type: 'mcp',
        },
      ],
    },
    {
      step: 4,
      title: '04. VERIFY, TESTING & QA FAIL LOOP',
      shortName: 'VERIFY',
      leadAi: 'Reviewer Agent & QA Subagent',
      role: 'Automated Testing & Self-Healing',
      statusBadge: '16/16 TESTS PASSED',
      statusColor: '#A855F7',
      description: 'Chạy kiểm thử toàn diện: Unit Test (xUnit), Integration Test (TestContainers), API Endpoint Test và E2E Browser Test (Playwright). Nếu fail, tự động ném bug về Coder sửa ngay.',
      logs: [
        {
          sender: 'Reviewer Subagent',
          senderRole: 'Code Style & Linter Audit',
          badgeColor: '#A855F7',
          text: 'Kiểm tra tuân thủ Clean Architecture: 0 linter warnings, phân tầng Domain/Application/Infrastructure chuẩn xác.',
          type: 'test',
        },
        {
          sender: 'QA Testing Subagent',
          senderRole: 'xUnit Test Runner',
          badgeColor: '#A855F7',
          text: 'Chạy lệnh: dotnet test --filter Category=UnitAndIntegration (16/16 tests PASSED - 1.84s).',
          type: 'test',
        },
        {
          sender: 'QA Testing Subagent',
          senderRole: 'End-to-End Playwright Verification',
          badgeColor: '#7ED957',
          text: 'Playwright Browser Test: Đặt hàng, trừ tồn kho, phát event WebSocket SignalR thành công 100%. QA Loop hoàn tất!',
          type: 'test',
        },
      ],
    },
    {
      step: 5,
      title: '05. BUILD & CONTAINER REGISTRY CI/CD',
      shortName: 'BUILD',
      leadAi: 'Release Agent & Jenkins Pipeline',
      role: 'Automated CI/CD Packaging',
      statusBadge: 'IMAGE PUSHED ACR',
      statusColor: '#38BDF8',
      description: 'Git push kích hoạt webhook Jenkins CI: biên dịch mã nguồn, kiểm thử tự động, build Docker image đa tầng (multi-stage) tối ưu dung lượng và đẩy lên Azure Container Registry.',
      logs: [
        {
          sender: 'Jenkins CI Engine',
          senderRole: 'Pipeline Trigger',
          badgeColor: '#38BDF8',
          text: 'Webhook received: commit #b84f29a. Bắt đầu pipeline #142 (Stage: Checkout -> Compile -> Test -> Docker Build).',
          type: 'build',
        },
        {
          sender: 'Docker Buildx Engine',
          senderRole: 'Multi-stage Container Build',
          badgeColor: '#38BDF8',
          text: 'Build container hoàn tất: Base image Alpine .NET 8 runtime, dung lượng tối ưu 114MB.',
          type: 'build',
        },
        {
          sender: 'Azure Container Registry',
          senderRole: 'Artifact Verification',
          badgeColor: '#7ED957',
          text: 'Pushed image: registry.azurecr.io/orders-api:v1.4.2 (Digest SHA256: 8f9b4a... verified).',
          type: 'build',
        },
      ],
    },
    {
      step: 6,
      title: '06. SECURITY, SAST & DEVSECOPS SCAN',
      shortName: 'SECURITY',
      leadAi: 'DevSecOps Security Agent',
      role: 'Vulnerability & Policy Enforcement',
      statusBadge: '0 VULNERABILITIES',
      statusColor: '#22C55E',
      description: 'Kiểm tra an ninh đa tầng: Quét mã nguồn tĩnh SAST (SonarQube), quét lỗ hổng phụ thuộc Trivy, quét rò rỉ bí mật Gitleaks, và kiểm tra tuân thủ OWASP Top 10.',
      logs: [
        {
          sender: 'SonarQube SAST Scanner',
          senderRole: 'Static Code Analysis',
          badgeColor: '#22C55E',
          text: 'Quét 42 tệp nguồn: 0 Security Hotspots, 0 Code Smells, Quality Gate status: PASSED (Grade A).',
          type: 'security',
        },
        {
          sender: 'Trivy Container Scanner',
          senderRole: 'CVE Vulnerability Scan',
          badgeColor: '#22C55E',
          text: 'Quét image registry.azurecr.io/orders-api:v1.4.2: 0 Critical, 0 High vulnerabilities.',
          type: 'security',
        },
        {
          sender: 'Gitleaks Secret Scanner',
          senderRole: 'Secret & Key Audit',
          badgeColor: '#7ED957',
          text: 'Kiểm tra phát hiện rò rỉ khóa bí mật: 0 API keys, 0 JWT tokens trong commit history. Đạt tiêu chuẩn DevSecOps!',
          type: 'security',
        },
      ],
    },
    {
      step: 7,
      title: '07. DEPLOY, AKS ROLLOUT & NETWORK CONFIG',
      shortName: 'DEPLOY',
      leadAi: 'Deployment Orchestrator',
      role: 'Zero-Downtime Infrastructure Rollout',
      statusBadge: '3/3 PODS READY',
      statusColor: '#7ED957',
      description: 'Triển khai Staging smoke-test, kích hoạt rolling update không gián đoạn trên Azure AKS Cluster, tự động cấu hình Cisco Core Switch VLAN 10 và FortiGate Firewall rules.',
      logs: [
        {
          sender: 'Helm Deployment Agent',
          senderRole: 'Kubernetes Rolling Update',
          badgeColor: '#7ED957',
          text: 'Helm upgrade --install orders-api ./chart: 3/3 Pods Running, Readiness Probes OK, Zero Downtime.',
          type: 'deploy',
        },
        {
          sender: 'Cisco Network Controller',
          senderRole: 'L3 Switch Trunk Config',
          badgeColor: '#F59E0B',
          text: 'Tự động cấu hình Core Switch Gi1/0/12 tagged VLAN 10 (Datacenter Subnet 192.168.10.0/24). Link UP/UP.',
          type: 'deploy',
        },
        {
          sender: 'FortiGate Security Gateway',
          senderRole: 'Firewall Policy Routing',
          badgeColor: '#38BDF8',
          text: 'Kích hoạt rule UTM Ingress: TLS 1.3 Inspection, Anti-DDoS rate limiting 10k req/s.',
          type: 'deploy',
        },
      ],
    },
    {
      step: 8,
      title: '08. OPERATE, OBSERVABILITY & SELF-HEALING',
      shortName: 'OPERATE',
      leadAi: 'AI-Ops Telemetry & SRE Auto-Healer',
      role: 'Observability & Autonomous Recovery',
      statusBadge: '99.99% HEALTHY',
      statusColor: '#22C55E',
      description: 'Giám sát Prometheus/Grafana NOC, Zabbix SNMP và phân tích log bất thường. Khi phát hiện sự cố, AI tự động chẩn đoán, kích hoạt Self-Healing Loop tự sửa chữa và phục hồi 100%.',
      logs: [
        {
          sender: 'Prometheus & Grafana NOC',
          senderRole: 'Real-time Metrics Observability',
          badgeColor: '#22C55E',
          text: 'Theo dõi hệ thống sản xuất: Throughput 6,420 req/s, P99 Latency 12.4ms, CPU 42%, Memory 61%.',
          type: 'operate',
        },
        {
          sender: 'SRE Incident Detection',
          senderRole: 'Anomaly Alerting',
          badgeColor: '#F59E0B',
          text: '[Mô phỏng sự cố]: Phát hiện micro-spike trên Pod #2 do bộ nhớ đệm tăng cao.',
          type: 'operate',
        },
        {
          sender: 'AI Auto-Healer Agent',
          senderRole: 'Autonomous Self-Healing Loop',
          badgeColor: '#7ED957',
          text: 'Kích hoạt Self-Healing: Tự động scale +1 Pod & giải phóng Redis cache key cũ. Hệ thống phục hồi 100% trong 4 giây!',
          type: 'operate',
        },
      ],
    },
  ];

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.updateResource();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lang']) {
      this.updateResource();
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.linuxTypeTimer) clearTimeout(this.linuxTypeTimer);
    if (this.ciscoTypeTimer) clearTimeout(this.ciscoTypeTimer);
    if (this.aiSimulationTimer) clearInterval(this.aiSimulationTimer);
    if (this.scenarioTimer) clearInterval(this.scenarioTimer);
  }

  private updateResource(): void {
    switch (this.lang) {
      case 'ENG':
        this.UIResource = UIResourceENG;
        break;
      case 'ZH':
        this.UIResource = UIResourceZH;
        break;
      case 'VI':
      default:
        this.UIResource = UIResourceVN;
        break;
    }
  }

  private setupIntersectionObserver(): void {
    if (!('IntersectionObserver' in window)) {
      this.revealAll();
      this.startLinuxTyping();
      this.startCiscoTyping();
      return;
    }

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');

          if (entry.target.id === 'systems' || entry.target.querySelector('#systems-terminal')) {
            this.startLinuxTyping();
          }
          if (entry.target.id === 'networking' || entry.target.querySelector('#networking-terminal')) {
            this.startCiscoTyping();
          }

          this.observer?.unobserve(entry.target);
        }
      });
    }, options);

    const scrollTargets = this.el.nativeElement.querySelectorAll('.scroll-reveal-item');
    scrollTargets.forEach((target: Element) => {
      this.observer?.observe(target);
    });
  }

  private revealAll(): void {
    const scrollTargets = this.el.nativeElement.querySelectorAll('.scroll-reveal-item');
    scrollTargets.forEach((target: Element) => {
      target.classList.add('is-revealed');
    });
  }

  // Typewriter for Linux Terminal
  startLinuxTyping(): void {
    if (this.linuxTypedCmd.length > 0 || this.isLinuxTypingDone) return;
    let idx = 0;
    const typeSpeed = 35;

    const typeNext = () => {
      if (idx < this.linuxFullCmd.length) {
        this.linuxTypedCmd += this.linuxFullCmd.charAt(idx);
        idx++;
        this.linuxTypeTimer = setTimeout(typeNext, typeSpeed);
      } else {
        this.isLinuxTypingDone = true;
      }
    };

    this.linuxTypeTimer = setTimeout(typeNext, 200);
  }

  // Typewriter for Cisco Terminal
  startCiscoTyping(): void {
    if (this.ciscoTypedCmd.length > 0 || this.isCiscoTypingDone) return;
    let idx = 0;
    const typeSpeed = 40;

    const typeNext = () => {
      if (idx < this.ciscoFullCmd.length) {
        this.ciscoTypedCmd += this.ciscoFullCmd.charAt(idx);
        idx++;
        this.ciscoTypeTimer = setTimeout(typeNext, typeSpeed);
      } else {
        this.isCiscoTypingDone = true;
      }
    };

    this.ciscoTypeTimer = setTimeout(typeNext, 350);
  }

  switchLinuxTab(tab: 'tree' | 'systemctl' | 'neofetch'): void {
    this.activeLinuxTab = tab;
  }

  switchCiscoTab(tab: 'topology' | 'routes' | 'vlan'): void {
    this.activeCiscoTab = tab;
  }

  switchDevOpsTab(tab: 'pipeline' | 'kubectl'): void {
    this.activeDevOpsTab = tab;
  }

  switchBackendTab(tab: 'flow' | 'code'): void {
    this.activeBackendTab = tab;
  }

  // Multi-AI 8-Phase Navigation & Auto Simulation
  selectAiStep(stepNumber: number): void {
    this.currentAiStep = stepNumber;
  }

  toggleAiSimulation(): void {
    this.isAiSimulating = !this.isAiSimulating;
    if (this.isAiSimulating) {
      this.runSimulationLoop();
    } else {
      if (this.aiSimulationTimer) clearInterval(this.aiSimulationTimer);
    }
  }

  private runSimulationLoop(): void {
    if (this.aiSimulationTimer) clearInterval(this.aiSimulationTimer);
    this.aiSimulationTimer = setInterval(() => {
      if (this.currentAiStep < 8) {
        this.currentAiStep++;
      } else {
        this.currentAiStep = 1;
      }
    }, 2500);
  }

  get currentStepData(): AiStepDetail {
    return this.aiSteps.find((s) => s.step === this.currentAiStep) || this.aiSteps[0];
  }

  // Grand Unified Convergence Domains Data (4 Domains + AI Layer)
  convergenceDomains: ConvergenceDomain[] = [
    {
      id: '01',
      num: '01',
      title: 'Systems & Server Infrastructure',
      shortTitle: 'SYSTEMS / SERVERS',
      categoryBadge: 'CORE FOUNDATION',
      accentColor: '#7ED957',
      headline: 'Hạ tầng máy chủ vật lý, ảo hóa doanh nghiệp, phân quyền danh tính và sao lưu dữ liệu toàn diện.',
      coreSkills: [
        'Windows Server & Linux (Ubuntu/RHEL)',
        'Active Directory & Microsoft Entra ID',
        'VMware ESXi & Hyper-V Clustering',
        'Veeam Backup & Disaster Recovery',
        'Zabbix & Grafana Telemetry',
      ],
      operationalRole:
        'Đảm bảo 99.98% độ sẵn sàng máy chủ vật lý và ảo hóa, kiểm soát toàn quyền Identity & Access Management, quản trị tài nguyên tính toán và lưu trữ dữ liệu an toàn cho doanh nghiệp.',
      metrics: [
        { label: 'UPTIME SLA', value: '99.98%', sub: 'High Availability Cluster' },
        { label: 'RPO / RTO', value: '< 15m / 1h', sub: 'Veeam Disaster Recovery' },
        { label: 'IDENTITY OBJECTS', value: '1,500+ Users', sub: 'Entra ID & AD DS Sync' },
      ],
      synergies: [
        {
          partnerNum: '02',
          partnerDomain: 'ENTERPRISE NETWORK',
          title: 'NIC Teaming & LACP VLAN Trunks',
          description:
            'Gắn kết dual 10GbE SFP+ interface vào Cisco Core Switch với giao thức IEEE 802.3ad LACP, phân luồng Management, vMotion, SAN iSCSI độc lập.',
          protocol: 'LACP 802.3ad / iSCSI',
        },
        {
          partnerNum: '03',
          partnerDomain: 'CLOUD & DEVOPS',
          title: 'Hybrid Cloud Identity & Storage',
          description:
            'Đồng bộ Active Directory lên Microsoft Entra ID với Azure AD Connect, mount NFS/SMB storage volume cho Azure Kubernetes Service (AKS).',
          protocol: 'Entra Connect / NFSv4',
        },
        {
          partnerNum: '04',
          partnerDomain: 'BACKEND SYSTEMS',
          title: 'Bare-Metal & VM Host Runtime Tuning',
          description:
            'Cấu hình Linux kernel parameters (sysctl somaxconn, nofile limits) tối ưu cho ASP.NET Core 8 Kestrel runtime và PostgreSQL cluster.',
          protocol: 'POSIX / Systemd cgroups',
        },
      ],
      aiSupercharge:
        'Claude Code & AI Subagents tự động phân tích hàng triệu dòng syslog / Windows Event Viewer, dự báo cạn kiệt ổ đĩa trước 7 ngày, sinh script PowerShell/Bash bảo trì tự động.',
    },
    {
      id: '02',
      num: '02',
      title: 'Enterprise Networking & Network Security',
      shortTitle: 'NETWORK / SECURITY',
      categoryBadge: 'ZERO-TRUST BACKBONE',
      accentColor: '#38BDF8',
      headline: 'Hạ tầng mạng phân lớp L2/L3, bảo mật chu vi FortiGate, VPN liên kết chi nhánh và phân tách vi mô.',
      coreSkills: [
        'Cisco Catalyst L3 Routing & Switching',
        'FortiGate NGFW (IPS/IDS, Antivirus, WAF)',
        'UniFi Enterprise SDN APs & Controller',
        'OSPF / BGP Dynamic Routing & IPsec Site-to-Site',
        '802.1X Network Access Control & ACL Hardening',
      ],
      operationalRole:
        'Thiết kế mạng phân cấp Core - Distribution - Access không điểm nghẽn, kiểm soát luồng gói tin qua tường lửa thế hệ mới, phân lập mạng nhạy cảm và chống xâm nhập độc hại.',
      metrics: [
        { label: 'BACKBONE CAPACITY', value: '20 Gbps', sub: 'Redundant Core Switching' },
        { label: 'FIREWALL THROUGHPUT', value: '4.5 Gbps', sub: 'Deep Packet Inspection' },
        { label: 'VPN ENCRYPTION', value: 'AES-256 GCM', sub: 'IPsec Site-to-Site Mesh' },
      ],
      synergies: [
        {
          partnerNum: '01',
          partnerDomain: 'SYSTEMS & SERVERS',
          title: 'Hardware Isolation & Secure Management',
          description:
            'Tách riêng VLAN 10 (Management), VLAN 20 (Production Servers), VLAN 30 (vMotion/iSCSI) với ACL nghiêm ngặt, chỉ cho phép SSH/RDP qua Bastion Host.',
          protocol: '802.1Q / PBR ACL',
        },
        {
          partnerNum: '03',
          partnerDomain: 'CLOUD & DEVOPS',
          title: 'DirectCloud & IPsec Tunnel to Azure',
          description:
            'Thiết lập IPsec Site-to-Site VPN từ FortiGate văn phòng vào Azure Virtual Network Gateway, cho phép CI/CD runner deploy an toàn vào private subnet.',
          protocol: 'IPsec IKEv2 / BGP',
        },
        {
          partnerNum: '04',
          partnerDomain: 'BACKEND SYSTEMS',
          title: 'Reverse Proxy, TLS 1.3 & WAF Protection',
          description:
            'Định tuyến traffic công cộng qua FortiGate WAF để lọc OWASP Top 10, rate limiting theo Client IP, bọc TLS 1.3 trước khi forward vào Backend API.',
          protocol: 'TLS 1.3 / HTTPS / WAF',
        },
      ],
      aiSupercharge:
        'AI Agent đối chiếu bảng định tuyến OSPF/BGP, tự động rà quét các lỗ hổng port và kiểm tra quy tắc ACL không xung đột với tiêu chuẩn Zero-Trust.',
    },
    {
      id: '03',
      num: '03',
      title: 'Cloud, DevOps & System Automation',
      shortTitle: 'CLOUD / DEVOPS',
      categoryBadge: 'CONTINUOUS DELIVERY ENGINE',
      accentColor: '#F59E0B',
      headline: 'Vận hành container hóa Kubernetes, tự động hóa hạ tầng và luồng triển khai CI/CD chuẩn quốc tế.',
      coreSkills: [
        'Microsoft Azure & AKS (Azure Kubernetes Service)',
        'Docker & Multi-Stage Containerization',
        'Jenkins & GitHub Actions CI/CD Pipeline',
        'Helm Charts & Kubernetes Ingress Controllers',
        'Infrastructure as Code (Terraform / Ansible)',
      ],
      operationalRole:
        'Rút ngắn chu kỳ phát hành sản phẩm từ tuần xuống phút, chuẩn hóa quy trình build - test - scan - deploy bất biến (Immutable Infrastructure) và tự động co giãn theo tải.',
      metrics: [
        { label: 'DEPLOY LEAD TIME', value: '< 4 Phút', sub: 'Commit to Production' },
        { label: 'CONTAINER SCALE', value: '1 → 30 Pods', sub: 'HPA Autoscaling < 30s' },
        { label: 'SECURITY GATING', value: '100% Passed', sub: 'Trivy & SonarQube Gate' },
      ],
      synergies: [
        {
          partnerNum: '01',
          partnerDomain: 'SYSTEMS & SERVERS',
          title: 'Hybrid Runner & Telemetry Aggregation',
          description:
            'Sử dụng Linux On-Premise làm Self-Hosted GitHub Actions runner, đẩy metric cụm AKS về Zabbix/Grafana tập trung qua Prometheus Node Exporter.',
          protocol: 'Prometheus / OpenMetrics',
        },
        {
          partnerNum: '02',
          partnerDomain: 'ENTERPRISE NETWORK',
          title: 'Software-Defined Network & Service Mesh',
          description:
            'Tích hợp Azure CNI phân phối địa chỉ IP từ Subnet thật cho từng Pod, cấu hình Network Security Groups (NSG) đồng bộ với chính sách Firewall On-Premise.',
          protocol: 'Azure CNI / Calico',
        },
        {
          partnerNum: '04',
          partnerDomain: 'BACKEND SYSTEMS',
          title: 'Zero-Downtime Rolling Release & Outbox',
          description:
            'Đóng gói ASP.NET Core 8 thành distroless container tối ưu <120MB, chạy Helm release với liveness/readiness probes gắn liền với database health-check.',
          protocol: 'Helm / OCI Image',
        },
      ],
      aiSupercharge:
        'AI Subagents review Helm YAML, tự động fix lỗi docker build cache, tối ưu memory limit cho pod và viết script pipeline Jenkins/GitHub Actions hoàn chỉnh.',
    },
    {
      id: '04',
      num: '04',
      title: 'Backend Systems & Distributed Architecture',
      shortTitle: 'BACKEND / CQRS',
      categoryBadge: 'TRANSACTION & LOGIC POWER',
      accentColor: '#A855F7',
      headline: 'Thiết kế kiến trúc phân tán Clean Architecture, CQRS, Event-Driven và quản trị cơ sở dữ liệu quy mô.',
      coreSkills: [
        'ASP.NET Core 8 Web API & C# (.NET 8)',
        'Clean Architecture & CQRS Pattern (MediatR)',
        'RabbitMQ Message Broker & Event-Driven Pub/Sub',
        'PostgreSQL & SQL Server with EF Core Optimization',
        'Redis Distributed Caching & Distributed Locking',
      ],
      operationalRole:
        'Xử lý logic nghiệp vụ phức tạp, đảm bảo tính toàn vẹn dữ liệu ACID, mở rộng ngang xử lý hàng chục nghìn giao dịch đồng thời mà không nghẽn cổ chai.',
      metrics: [
        { label: 'THROUGHPUT', value: '10,000+ RPS', sub: 'Distributed Async Flow' },
        { label: 'P99 LATENCY', value: '< 35 ms', sub: 'Redis Caching & CQRS Read' },
        { label: 'EVENT RELIABILITY', value: '99.999%', sub: 'Transactional Outbox Pattern' },
      ],
      synergies: [
        {
          partnerNum: '01',
          partnerDomain: 'SYSTEMS & SERVERS',
          title: 'Kernel Thread Tuning & DB Disk I/O',
          description:
            'Phối hợp với OS Administrator cấu hình Linux vm.dirty_ratio, mount NVMe SSD cho PostgreSQL WAL logs, đảm bảo IOPS tối đa cho Database.',
          protocol: 'POSIX / NVMe Direct',
        },
        {
          partnerNum: '02',
          partnerDomain: 'ENTERPRISE NETWORK',
          title: 'TCP Keepalive & Encrypted Payload',
          description:
            'Tối ưu hóa TCP socket connection pooling, xử lý graceful degradation khi mạng giữa các microservices bị rớt gói hoặc chập chờn.',
          protocol: 'gRPC / HTTP/2',
        },
        {
          partnerNum: '03',
          partnerDomain: 'CLOUD & DEVOPS',
          title: 'Cloud-Native 12-Factor Compliance',
          description:
            'Tách biệt hoàn toàn config ra environment variables, xuất structured logs dạng JSON cho Fluentd, cung cấp endpoint /healthz cho Kubernetes Probes.',
          protocol: '12-Factor App / OTLP',
        },
      ],
      aiSupercharge:
        'Claude Code kết nối MCP Database schema để sinh toàn bộ CQRS Handlers, phát hiện tiềm tàng N+1 query, và sinh test xUnit/E2E Playwright phủ 90% logic nghiệp vụ.',
    },
    {
      id: 'ai',
      num: 'AI',
      title: 'AI Orchestrator & Autonomous Toolchain',
      shortTitle: 'AI ORCHESTRATOR',
      categoryBadge: 'FORCE MULTIPLIER (10X)',
      accentColor: '#7ED957',
      headline: 'Bộ não điều phối đa tác nhân AI kết nối MCP và kỹ năng chuyên sâu liên kết cả 4 trụ cột kỹ thuật.',
      coreSkills: [
        'Claude 3.7 Sonnet (Thinking & Code CLI)',
        'ChatGPT o1/o3-mini (Adversarial Critique)',
        'Gemini 2.0 (Massive Context & RFC Analyzer)',
        'Model Context Protocol (MCP) Standards',
        'Autonomous Self-Correction & Auto-Healing',
      ],
      operationalRole:
        'Xâu chuỗi và đồng bộ cả 4 lĩnh vực kỹ thuật: từ phân tích yêu cầu, thiết kế kiến trúc, sinh mã nguồn, quét an ninh mạng, kiểm thử tự động đến giám sát và tự phục hồi hệ thống.',
      metrics: [
        { label: 'SPEEDUP FACTOR', value: '3x - 5x', sub: 'End-to-End Delivery Speed' },
        { label: 'DEFECT ESCAPE', value: '< 0.5%', sub: 'Adversarial Multi-AI Gating' },
        { label: 'SELF-HEAL TIME', value: '< 90s', sub: 'Autonomous MTTR Resolution' },
      ],
      synergies: [
        {
          partnerNum: '01, 02, 03, 04',
          partnerDomain: 'ALL 4 DOMAINS',
          title: 'Full-Spectrum Technical Synchronization',
          description:
            'Không có bất kỳ sự đứt gãy nào giữa code Backend, hạ tầng Mạng, cấu hình Máy chủ và Pipeline Cloud — AI đóng vai trò như chất keo kết dính kỹ thuật tuyệt đối.',
          protocol: 'MCP Protocol Bus',
        },
      ],
      aiSupercharge:
        'Biến kỹ sư từ người gõ phím đơn lẻ thành Giám đốc Kỹ thuật (Technical Commander) điều khiển đội quân AI Subagents tinh nhuệ hoạt động 24/7.',
    },
  ];

  // 3 Real-World Cross-Domain Convergence Scenarios
  convergenceScenarios: ConvergenceScenario[] = [
    {
      id: 'dr-self-healing',
      title: 'Sự Cố Đứt Gãy Dịch Vụ & Tự Động Phục Hồi (Disaster Recovery & Self-Healing)',
      subtitle: 'Khả năng ứng cứu và tự phục hồi hệ thống không cần can thiệp thủ công',
      badge: 'AUTONOMOUS RECOVERY',
      badgeColor: '#EF4444',
      totalTime: '< 90 Giây',
      description:
        'Mô phỏng một pod Backend gặp sự cố rò rỉ bộ nhớ gây sập API vào ban đêm. Hệ thống phối hợp liên chuyên môn và AI Agent tự phục hồi tức thì.',
      steps: [
        {
          domainNum: '04',
          domainName: 'Backend CQRS',
          badgeColor: '#A855F7',
          action: 'Lỗi OOM Memory Spike trên Pod Checkout',
          telemetry: 'Pod /api/v1/checkout rớt liveness probe, trả về HTTP 503 Service Unavailable.',
          status: 'CRITICAL',
        },
        {
          domainNum: '01',
          domainName: 'Server Telemetry',
          badgeColor: '#7ED957',
          action: 'Prometheus & Zabbix kích hoạt Alertmanager',
          telemetry: 'Alertmanager bắn webhook tới Alert Dispatcher: Pod crash count > 3 trong 60 giây.',
          status: 'TRIGGERED',
        },
        {
          domainNum: '02',
          domainName: 'Network Security',
          badgeColor: '#38BDF8',
          action: 'FortiGate & Ingress Chuyển Luồng Thông Minh',
          telemetry: 'Lập tức cách ly IP pod lỗi, chuyển 100% traffic thanh toán sang replica dự phòng tại Zone B.',
          status: 'ISOLATED',
        },
        {
          domainNum: 'AI',
          domainName: 'AI Orchestrator',
          badgeColor: '#7ED957',
          action: 'Claude Subagent Phân Tích Crash Dump & Logs',
          telemetry: 'Đọc core dump: Phát hiện vòng lặp event bus không giải phóng bộ nhớ trong handler. Tự động sinh hotfix commit.',
          status: 'DIAGNOSED',
        },
        {
          domainNum: '03',
          domainName: 'Cloud / DevOps',
          badgeColor: '#F59E0B',
          action: 'Jenkins CI & Rolling Restart Cụm AKS',
          telemetry: 'Build hotfix container image, chạy test tự động và thực hiện rolling update AKS zero-downtime.',
          status: 'RESOLVED',
        },
      ],
    },
    {
      id: 'high-concurrency-surge',
      title: 'Đột Biến Tải Lưu Lượng Cao Điểm (High-Load Elastic Surge)',
      subtitle: 'Co giãn hạ tầng theo thời gian thực chịu tải 15,000 req/s',
      badge: 'ELASTIC SCALING',
      badgeColor: '#38BDF8',
      totalTime: '< 45 Giây',
      description:
        'Chiến dịch Flash-sale bùng nổ lưu lượng truy cập gấp 10 lần. Toàn bộ hạ tầng mạng, máy chủ và microservices tự động phối hợp co giãn tức thì.',
      steps: [
        {
          domainNum: '02',
          domainName: 'Network Backbone',
          badgeColor: '#38BDF8',
          action: 'Cisco L3 & FortiGate Tiếp Nhận 15,000 req/s',
          telemetry: 'Lưu lượng băng thông tăng từ 450Mbps lên 3.2Gbps. FortiGate kích hoạt SYN flood protection & Rate-limiting.',
          status: 'PEAK INGRESS',
        },
        {
          domainNum: '04',
          domainName: 'Backend CQRS',
          badgeColor: '#A855F7',
          action: 'RabbitMQ Buffer & Redis Cache Boost',
          telemetry: 'Command ghi đơn hàng được xếp hàng vào RabbitMQ, Read API phục vụ 98.4% từ Redis RAM không chạm Database.',
          status: 'BUFFERED',
        },
        {
          domainNum: '03',
          domainName: 'Cloud / DevOps',
          badgeColor: '#F59E0B',
          action: 'AKS Horizontal Pod Autoscaling (HPA)',
          telemetry: 'Kubernetes HPA nhân bản từ 4 pods lên 24 pods trong 35 giây dựa trên CPU & Queue depth metric.',
          status: 'AUTOSCALED',
        },
        {
          domainNum: '01',
          domainName: 'Systems & Servers',
          badgeColor: '#7ED957',
          action: 'Hyper-V Dynamic Memory & I/O Tuning',
          telemetry: 'Phân bổ động thêm 32GB RAM cho Database Server node, duy trì Disk I/O ổn định < 2ms latency.',
          status: 'STABILIZED',
        },
        {
          domainNum: 'AI',
          domainName: 'AI Orchestrator',
          badgeColor: '#7ED957',
          action: 'Giám Sát Lưu Lượng & Tối Ưu Hóa Chi Phí',
          telemetry: 'Dự đoán điểm suy giảm lưu lượng sau flash-sale và lên lịch scale-down giảm chi phí điện toán đám mây.',
          status: 'OPTIMIZED',
        },
      ],
    },
    {
      id: 'zero-trust-security',
      title: 'Bảo Mật Đa Tầng Zero-Trust Toàn Diện (End-to-End Zero-Trust)',
      subtitle: 'Ngăn chặn tấn công xâm nhập từ vành đai mạng đến từng dòng lệnh',
      badge: 'ZERO-TRUST DEFENSE',
      badgeColor: '#7ED957',
      totalTime: '< 10 Giây',
      description:
        'Bảo vệ tài sản số doanh nghiệp với 4 lớp phòng thủ chiều sâu từ xác thực người dùng đến phân tách ứng dụng.',
      steps: [
        {
          domainNum: '01',
          domainName: 'Identity & Access',
          badgeColor: '#7ED957',
          action: 'Microsoft Entra ID & Conditional Access',
          telemetry: 'Bắt buộc FIDO2/MFA xác thực danh tính, kiểm tra trạng thái thiết bị hợp chuẩn trước khi cấp token.',
          status: 'AUTHENTICATED',
        },
        {
          domainNum: '02',
          domainName: 'Network Hardening',
          badgeColor: '#38BDF8',
          action: '802.1X NAC & FortiGate Micro-segmentation',
          telemetry: 'Thiết bị vào VLAN chỉ định, chặn toàn bộ kết nối Lateral Movement giữa máy client và database.',
          status: 'SEGMENTED',
        },
        {
          domainNum: '03',
          domainName: 'DevSecOps Gate',
          badgeColor: '#F59E0B',
          action: 'Trivy & SonarQube Pipeline Scan',
          telemetry: 'Quét 0 critical CVE trên container image, chữ ký số cosign chứng thực nguồn gốc build an toàn.',
          status: 'VERIFIED',
        },
        {
          domainNum: '04',
          domainName: 'Backend Security',
          badgeColor: '#A855F7',
          action: 'JWT Claims & Anti-Tamper Audit Log',
          telemetry: 'Mã hóa AES-256 dữ liệu nhạy cảm at-rest, ghi log kiểm toán không thể sửa đổi (Immutable Audit).',
          status: 'PROTECTED',
        },
        {
          domainNum: 'AI',
          domainName: 'AI Security Agent',
          badgeColor: '#7ED957',
          action: 'Rà Soát Hành Vi Bất Thường Thời Gian Thực',
          telemetry: 'Phân tích heuristic luồng request, tự động khóa IP nếu phát hiện tấn công Brute-Force hoặc SQLi.',
          status: 'SHIELDED',
        },
      ],
    },
  ];

  // Convergence Ecosystem Interaction Methods
  selectConvergenceTab(tab: 'all' | '01' | '02' | '03' | '04' | 'ai'): void {
    this.selectedConvergenceTab = tab;
  }

  selectScenario(index: number): void {
    this.activeScenarioIndex = index;
    this.activeScenarioStepIdx = 0;
  }

  toggleScenarioPlay(): void {
    this.isScenarioAutoPlaying = !this.isScenarioAutoPlaying;
    if (this.isScenarioAutoPlaying) {
      this.runScenarioLoop();
    } else {
      if (this.scenarioTimer) clearInterval(this.scenarioTimer);
    }
  }

  private runScenarioLoop(): void {
    if (this.scenarioTimer) clearInterval(this.scenarioTimer);
    this.scenarioTimer = setInterval(() => {
      const currentSteps = this.convergenceScenarios[this.activeScenarioIndex].steps;
      if (this.activeScenarioStepIdx < currentSteps.length - 1) {
        this.activeScenarioStepIdx++;
      } else {
        this.activeScenarioStepIdx = 0;
      }
    }, 2000);
  }

  get selectedDomainData(): ConvergenceDomain | null {
    if (this.selectedConvergenceTab === 'all') return null;
    return this.convergenceDomains.find((d) => d.id === this.selectedConvergenceTab) || null;
  }

  get activeScenario(): ConvergenceScenario {
    return this.convergenceScenarios[this.activeScenarioIndex];
  }

  replayLinuxTerminal(): void {
    this.linuxTypedCmd = '';
    this.isLinuxTypingDone = false;
    this.startLinuxTyping();
  }

  replayCiscoTerminal(): void {
    this.ciscoTypedCmd = '';
    this.isCiscoTypingDone = false;
    this.startCiscoTyping();
  }
}
