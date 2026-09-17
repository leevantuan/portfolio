import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIResourceENG } from '../../shared/lang/eng';
import { UIResourceVN } from '../../shared/lang/vn';
import { UIResourceZH } from '../../shared/lang/zh';
import { TECH_TERMS } from '../../shared/constants/tech-terms';

export interface TerminalLogEntry {
  time: string;
  tag: string;
  text: string;
  type: 'info' | 'success' | 'warn' | 'error';
}

@Component({
  selector: 'app-diagram-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diagram-viewer.component.html',
  styleUrl: './diagram-viewer.component.css',
})
export class DiagramViewerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() isOpen: boolean = false;
  @Input() lang: string = 'ENG';
  @Output() close = new EventEmitter<void>();

  TECH = TECH_TERMS;
  UIResource: any = UIResourceENG;

  // Active Tab: 01. Enterprise Network | 02. Enterprise Server | 03. Enterprise System | 04. Enterprise Access
  activeTab: 'network' | 'server' | 'system' | 'permission' = 'network';
  activeTimeFilter: 'live' | '1h' | '6h' | '24h' | '7d' = 'live';

  // ==========================================
  // TAB 02: ENTERPRISE SERVER INFRASTRUCTURE STATE
  // ==========================================
  tabServerSelectedTier: number = 0;
  tabServerTiers = [
    '01 Multi-Region Users (10k+)',
    '02 Edge DDoS & WAF Protection',
    '03 Fortinet HA Active/Standby',
    '04 Enterprise Load Balancer',
    '05 Scalable Service Clusters',
    '06 HA Database (PostgreSQL/SQL)',
    '07 Primary DC (HCM Production)',
    '08 DR Site (Singapore Standby)',
    '09 SAN/NAS Storage & Retention',
  ];

  tabServerInterfaces = [
    { name: 'Edge DDoS / WAF Shield', status: 'ARMED', color: 'emerald' },
    { name: 'Fortinet HA Cluster', status: 'SYNC OK', color: 'emerald' },
    { name: 'Enterprise Load Balancer', status: 'L4/L7 ACTIVE', color: 'emerald' },
    { name: 'Web Cluster (Auto-Scale)', status: '3/3 NODES', color: 'emerald' },
    { name: 'Application Microservices', status: '3/3 NODES', color: 'emerald' },
    { name: 'Internal Directory & Mail', status: 'HEALTHY', color: 'emerald' },
    { name: 'Database Sync Replication', status: '< 2.4ms LAG', color: 'emerald' },
    { name: 'Primary DC (HCM, VN)', status: 'ACTIVE (PROD)', color: 'emerald' },
    { name: 'Disaster Recovery (SG)', status: 'WARM STANDBY', color: 'cyan' },
    { name: 'SAN/NAS Snapshots (365d)', status: 'SYNCHRONIZED', color: 'emerald' },
  ];

  isServerFailoverActive: boolean = false;
  toggleServerFailover(): void {
    this.isServerFailoverActive = !this.isServerFailoverActive;
  }

  // ==========================================
  // TAB 01: NETWORK TOPOLOGY STATE
  // ==========================================
  tab1SelectedZone: number = 0;
  tab1Zones = [
    '01 Perimeter (FortiGate HA)',
    '02 Core Switch (Catalyst L3)',
    '03 Distribution & VLANs',
    '04 Server Farm (vSphere/Dell)',
    '05 Storage & Backup (Veeam)',
    '06 Cloud Hybrid (AWS/Azure)',
    '07 Branch Offices (IPsec)',
    '08 Wireless UniFi APs',
    '09 DMZ Isolated Zone',
    '10 NOC & Observability',
  ];

  tab1Interfaces = [
    { name: 'WAN 1 (Fiber 1G)', status: 'UP', color: 'emerald' },
    { name: 'WAN 2 (Backup 500M)', status: 'STANDBY', color: 'zinc' },
    { name: 'Core 10G SFP+ Trunk', status: '10 Gbps', color: 'emerald' },
    { name: 'VLAN 10 Corporate', status: 'Active', color: 'emerald' },
    { name: 'VLAN 20 IoT / Devices', status: 'Active', color: 'emerald' },
    { name: 'VLAN 30 Guest WiFi', status: 'Active', color: 'emerald' },
    { name: 'IPsec Site-to-Site', status: 'Connected', color: 'emerald' },
    { name: 'AWS DirectConnect', status: '1 Gbps', color: 'emerald' },
    { name: 'Azure ExpressRoute', status: '1 Gbps', color: 'emerald' },
    { name: 'HA Heartbeat Sync', status: 'SYNC', color: 'emerald' },
  ];

  // ==========================================
  // TAB 02: SYSTEM ARCHITECTURE STATE
  // ==========================================
  tab2Stepper = ['Client', 'Security', 'Services', 'Data', 'Event', 'Worker', 'Real-time'];
  tab2ActiveStep: number = 2; // 0..6
  isFlowRunning: boolean = true;
  private flowTimer: any = null;

  tab2SelectedLayer: number = 0;
  tab2Layers = [
    '01 Client & Security',
    '02 Business Services',
    '03 Data & Storage',
    '04 Event & Messaging',
    '05 Async Workers',
    '06 Real-time (SignalR)',
    '07 Cache Layer (Redis)',
    '08 CI/CD Pipeline',
    '09 Observability',
    '10 System Status',
  ];

  tab2SystemStatus = [
    { name: 'API Gateway', status: 'Healthy', color: 'emerald' },
    { name: 'Auth Service', status: 'Healthy', color: 'emerald' },
    { name: 'Microservices', status: '6/6', color: 'emerald' },
    { name: 'Message Brokers', status: '2/2', color: 'emerald' },
    { name: 'Databases', status: 'Healthy', color: 'emerald' },
    { name: 'Cache Cluster', status: 'Healthy', color: 'emerald' },
    { name: 'Background Workers', status: '4/4', color: 'emerald' },
    { name: 'SignalR Hub', status: 'Online', color: 'emerald' },
    { name: 'CI/CD Pipeline', status: 'Idle', color: 'zinc' },
    { name: 'Monitoring', status: 'Healthy', color: 'emerald' },
  ];

  tab2Logs: TerminalLogEntry[] = [
    { time: '10:24:01', tag: 'INFO', text: 'Request received GET /api/orders', type: 'info' },
    { time: '10:24:01', tag: 'INFO', text: 'JWT validated (user: tuan.le)', type: 'info' },
    { time: '10:24:02', tag: 'INFO', text: 'Permission check -> ALLOWED', type: 'success' },
    { time: '10:24:02', tag: 'INFO', text: 'OrderService -> Processing command', type: 'info' },
    { time: '10:24:03', tag: 'INFO', text: 'PostgreSQL (Write) -> Transaction committed', type: 'info' },
    { time: '10:24:03', tag: 'INFO', text: 'Outbox event created (OrderCreated)', type: 'info' },
    { time: '10:24:04', tag: 'INFO', text: 'RabbitMQ -> Event published', type: 'info' },
    { time: '10:24:04', tag: 'INFO', text: 'Worker -> Processing event (idempotent)', type: 'info' },
    { time: '10:24:05', tag: 'INFO', text: 'Redis -> Cache updated (order:ORD-20240915-001)', type: 'info' },
    { time: '10:24:05', tag: 'INFO', text: 'SignalR -> Broadcast to 12 clients', type: 'info' },
    { time: '10:24:06', tag: 'INFO', text: 'Email -> Notification sent', type: 'info' },
    { time: '10:24:06', tag: 'SUCCESS', text: 'Request completed in 512ms', type: 'success' },
  ];

  // ==========================================
  // TAB 03: PERMISSION & ACCESS CONTROL STATE
  // ==========================================
  tab3Stepper = ['Identity', 'Role', 'Permission', 'Resource', 'Folder', 'File', 'Decision'];
  tab3ActiveStep: number = 6; // 0..6
  isAccessCheckRunning: boolean = true;
  private accessCheckTimer: any = null;

  cicdActiveStep: number = 8;

  tab3SelectedModule: number = 0;
  tab3Modules = [
    '01 User & Identity',
    '02 Role & Department',
    '03 Binary Permission',
    '04 Resource Scope',
    '05 Folder / File ACL',
    '06 Access Decision',
    '07 Audit & Logging',
    '08 Permission Matrix',
    '09 API Integration',
    '10 System Settings',
  ];

  tab3OnlineUsers = [
    { name: 'tuan.le', role: 'System Admin', active: true },
    { name: 'nguyen.van', role: 'IT Manager', active: true },
    { name: 'trang.ngo', role: 'HR Staff', active: true },
    { name: 'minh.pham', role: 'Finance', active: true },
    { name: 'dev-ops', role: 'Developer', active: true },
    { name: 'guest', role: 'Guest', active: false },
  ];

  selectedRole: string = 'System Admin';
  selectRole(role: string): void {
    this.selectedRole = role;
  }

  expandedFolders: { [key: string]: boolean } = {
    company: true,
    IT: true,
    Server: true,
    Network: false,
    Projects: false,
    Shared: false,
    Public: false,
  };

  toggleFolder(folder: string): void {
    this.expandedFolders[folder] = !this.expandedFolders[folder];
  }

  tab3FileTab: 'permissions' | 'inheritance' | 'audit' = 'permissions';
  tab3LogFilter: 'all' | 'info' | 'warn' | 'error' = 'all';

  tab3Logs: TerminalLogEntry[] = [
    { time: '10:24:01', tag: 'INFO', text: 'User tuan.le logged in from 192.168.1.100', type: 'info' },
    { time: '10:24:05', tag: 'INFO', text: 'Permission check: /company/IT/Server/config.json', type: 'info' },
    { time: '10:24:05', tag: 'INFO', text: 'Role: System Admin (11011010)', type: 'info' },
    { time: '10:24:05', tag: 'INFO', text: 'Access granted: Read, Write, Execute, Share', type: 'success' },
    { time: '10:24:06', tag: 'INFO', text: 'File downloaded: config.json (12.4 KB)', type: 'info' },
    { time: '10:25:12', tag: 'WARN', text: 'Access denied: /company/HR/Salary/salary.xlsx (Delete)', type: 'warn' },
    { time: '10:25:30', tag: 'INFO', text: 'User nguyen.van accessed /company/IT/Network/', type: 'info' },
    { time: '10:25:45', tag: 'INFO', text: 'Permission updated: HR Staff (000001)', type: 'info' },
    { time: '10:26:01', tag: 'INFO', text: 'Audit log exported by tuan.le', type: 'info' },
    { time: '10:26:12', tag: 'INFO', text: 'Folder permission inherited: /company/IT/', type: 'info' },
  ];

  // Selected file in Tab 3 Resource Explorer
  tab3SelectedFile: string = 'config.json';
  tab3SelectedFileData = {
    name: 'config.json',
    path: '/company/IT/Server/config.json',
    owner: 'IT Department',
    group: 'IT Team',
    binary: '11011010',
    read: true,
    write: true,
    execute: true,
    admin: true,
    delete: false,
    modified: '2024-09-15 10:24:18',
    size: '12.4 KB'
  };

  selectFile(name: string, path: string, binary: string, size: string): void {
    this.tab3SelectedFile = name;
    this.tab3SelectedFileData = {
      name,
      path,
      owner: name.includes('salary') ? 'HR Department' : 'IT Department',
      group: name.includes('salary') ? 'HR Team' : 'IT Team',
      binary,
      read: true,
      write: binary[1] === '1',
      execute: binary[3] === '1',
      admin: binary[0] === '1',
      delete: binary[2] === '1',
      modified: '2024-09-15 10:24:18',
      size
    };
  }

  get filteredTab3Logs(): TerminalLogEntry[] {
    if (this.tab3LogFilter === 'all') return this.tab3Logs;
    return this.tab3Logs.filter(log => log.type === this.tab3LogFilter || (this.tab3LogFilter === 'info' && log.type === 'success'));
  }

  jumpToFlowStep(index: number): void {
    this.tab2ActiveStep = index;
  }

  jumpToAccessStep(index: number): void {
    this.tab3ActiveStep = index;
  }

  ngOnInit(): void {
    this.updateResource();
    this.startTimers();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lang']) {
      this.updateResource();
    }
    if (changes['isOpen']) {
      if (this.isOpen) {
        this.activeTab = 'network';
        this.startTimers();
      } else {
        this.stopTimers();
      }
    }
  }

  ngOnDestroy(): void {
    this.stopTimers();
  }

  setTab(tab: 'network' | 'server' | 'system' | 'permission'): void {
    this.activeTab = tab;
  }

  setTimeFilter(filter: 'live' | '1h' | '6h' | '24h' | '7d'): void {
    this.activeTimeFilter = filter;
  }

  @HostListener('document:keydown.escape')
  onKeydownHandler() {
    if (this.isOpen) {
      this.closeModal();
    }
  }

  closeModal(): void {
    this.stopTimers();
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    this.closeModal();
  }

  // Stepper & Animation Controls
  toggleFlow(): void {
    this.isFlowRunning = !this.isFlowRunning;
  }

  toggleAccessCheck(): void {
    this.isAccessCheckRunning = !this.isAccessCheckRunning;
  }

  private startTimers(): void {
    this.stopTimers();
    // Flow stepper timer (Tab 2)
    this.flowTimer = setInterval(() => {
      if (this.isFlowRunning) {
        this.tab2ActiveStep = (this.tab2ActiveStep + 1) % this.tab2Stepper.length;
      }
    }, 2000);

    // Access check stepper timer (Tab 3)
    this.accessCheckTimer = setInterval(() => {
      if (this.isAccessCheckRunning) {
        this.tab3ActiveStep = (this.tab3ActiveStep + 1) % this.tab3Stepper.length;
      }
    }, 2200);
  }

  private stopTimers(): void {
    if (this.flowTimer) {
      clearInterval(this.flowTimer);
      this.flowTimer = null;
    }
    if (this.accessCheckTimer) {
      clearInterval(this.accessCheckTimer);
      this.accessCheckTimer = null;
    }
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
}
