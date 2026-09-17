import { Component, EventEmitter, Input, Output, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface StationDetails {
  title: string;
  category: string;
  line1: string;
  line2: string;
}

@Component({
  selector: 'app-global-network',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './global-network.component.html',
  styleUrl: './global-network.component.css',
})
export class GlobalNetworkComponent implements OnDestroy {
  @Input() lang: string = 'ENG';
  @Output() viewArchitecture = new EventEmitter<void>();

  selectedNode: string | null = null;
  hoveredStation: string | null = null;

  typedLine1: string = '';
  typedLine2: string = '';
  typingLine2: boolean = false;
  private typingTimer: any = null;

  readonly stationData: Record<string, StationDetails> = {
    clients: {
      title: 'SYS.CLIENTS',
      category: 'ENDPOINTS',
      line1: 'Angular 19 • TypeScript • TailwindCSS',
      line2: 'Desktop PC • Laptop • Mobile PWA • REST'
    },
    firewall: {
      title: 'SEC.FIREWALL',
      category: 'PERIMETER DEFENSE',
      line1: 'Fortinet FortiGate • Palo Alto • ASA',
      line2: 'IPsec VPN • Next-Gen WAF • IDS/IPS Shield'
    },
    network: {
      title: 'NET.ROUTING',
      category: 'CORE & WIRELESS',
      line1: 'Cisco Catalyst 3850X / 2960X • PoE+',
      line2: 'UniFi Controller • AP WiFi 6 • VLAN 10/20/30'
    },
    database: {
      title: 'DATA.CLUSTER',
      category: 'DATA STORAGE',
      line1: 'MS SQL Server • PostgreSQL • MongoDB',
      line2: 'Redis Cache • MySQL • ACID Replication'
    },
    cloud: {
      title: 'CLOUD.HYBRID',
      category: 'MULTI-CLOUD & IAAS',
      line1: 'AWS (EC2, S3, RDS, VPC) • Azure Cloud',
      line2: 'Google Cloud GCP • Kubernetes • Docker'
    },
    servers: {
      title: 'SRV.COMPUTE',
      category: 'DATACENTER',
      line1: 'VMware ESXi Cluster • vCenter Server HA',
      line2: 'Windows Server 2022 • Active Directory • Linux'
    },
    storage: {
      title: 'STORE.BACKUP',
      category: 'DATA RESILIENCE',
      line1: 'Synology NAS 24-Bay RAID 10 • Btrfs',
      line2: 'Veeam Backup Server • 3-2-1 Rule • S3 Offsite'
    },
    monitoring: {
      title: 'OPS.MONITOR',
      category: 'NOC TELEMETRY',
      line1: 'Grafana NOC • Prometheus • Zabbix Server',
      line2: 'SNMP Real-time Metrics • Alerting • APM'
    }
  };

  get activeStation(): string | null {
    return this.hoveredStation || this.selectedNode;
  }

  get currentInfo(): StationDetails | null {
    const key = this.activeStation;
    return key ? this.stationData[key] : null;
  }

  onStationHover(nodeName: string): void {
    if (this.hoveredStation === nodeName) return;
    this.hoveredStation = nodeName;
    this.startTypewriter(nodeName);
  }

  onStationLeave(): void {
    this.hoveredStation = null;
    if (!this.selectedNode) {
      this.clearTypewriter();
    } else {
      this.startTypewriter(this.selectedNode);
    }
  }

  selectNode(nodeName: string): void {
    if (this.selectedNode === nodeName) {
      this.selectedNode = null;
      if (!this.hoveredStation) {
        this.clearTypewriter();
      }
    } else {
      this.selectedNode = nodeName;
      this.startTypewriter(nodeName);
    }
  }

  private startTypewriter(nodeName: string): void {
    this.clearTypewriter();
    const data = this.stationData[nodeName];
    if (!data) return;

    this.typedLine1 = '';
    this.typedLine2 = '';
    this.typingLine2 = false;

    const full1 = data.line1;
    const full2 = data.line2;
    let idx1 = 0;
    let idx2 = 0;

    this.typingTimer = setInterval(() => {
      if (idx1 < full1.length) {
        this.typedLine1 += full1[idx1++];
      } else if (!this.typingLine2) {
        this.typingLine2 = true;
      } else if (idx2 < full2.length) {
        this.typedLine2 += full2[idx2++];
      } else {
        clearInterval(this.typingTimer);
        this.typingTimer = null;
      }
    }, 32);
  }

  private clearTypewriter(): void {
    if (this.typingTimer) {
      clearInterval(this.typingTimer);
      this.typingTimer = null;
    }
    this.typedLine1 = '';
    this.typedLine2 = '';
    this.typingLine2 = false;
  }

  onViewSpecs(): void {
    this.viewArchitecture.emit();
  }

  scrollToNext(): void {
    const el = document.getElementById('story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngOnDestroy(): void {
    this.clearTypewriter();
  }
}
