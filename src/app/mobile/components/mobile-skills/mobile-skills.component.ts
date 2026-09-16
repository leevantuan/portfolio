import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SkillDomain {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  badge: string;
  groups: {
    title: string;
    items: string[];
  }[];
}

@Component({
  selector: 'app-mobile-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-skills.component.html',
  styleUrl: './mobile-skills.component.css'
})
export class MobileSkillsComponent {
  @Input() lang: string = 'ENG';
  @Input() UIResource: any;

  activeDomainId: string = 'systems';

  readonly domains: SkillDomain[] = [
    {
      id: 'systems',
      num: '01',
      title: 'SYSTEM & SERVER INFRASTRUCTURE',
      subtitle: 'Virtualization, Identity & High Availability',
      badge: 'CORE INFRA',
      groups: [
        {
          title: 'OS & Centralized Identity',
          items: ['Windows Server', 'Linux (Ubuntu/RHEL)', 'Active Directory / GPO', 'DNS / DHCP Failover', 'Microsoft Entra ID', 'M365 & Exchange']
        },
        {
          title: 'Virtualization & Backup',
          items: ['VMware ESXi Cluster', 'vCenter Server HA', 'Proxmox VE', 'Veeam Backup & Replication', 'NAS Storage RAID 10', 'Disaster Recovery']
        }
      ]
    },
    {
      id: 'network',
      num: '02',
      title: 'ENTERPRISE NETWORKING & SECURITY',
      subtitle: 'Routing, Switching, Firewall & Wireless',
      badge: 'CCNP LEVEL',
      groups: [
        {
          title: 'Routing & Switching Core',
          items: ['Cisco Catalyst 3850X / 2960X', 'VLAN 10/20/30 Segmentation', 'OSPF & BGP Routing', 'L2/L3 Switching & Trunking', 'UniFi Enterprise AP', 'QoS & Traffic Shaping']
        },
        {
          title: 'Perimeter Defense & VPN',
          items: ['Fortinet FortiGate 1500D', 'Palo Alto Networks', 'Site-to-Site IPsec VPN', 'Next-Gen Firewall (NGFW)', 'WAF & IDS/IPS Shield', 'SSL Inspection']
        }
      ]
    },
    {
      id: 'cloud',
      num: '03',
      title: 'HYBRID CLOUD & DEVOPS AUTOMATION',
      subtitle: 'Containers, CI/CD & Observability',
      badge: 'DEVOPS / NOC',
      groups: [
        {
          title: 'Cloud & Orchestration',
          items: ['Microsoft Azure (AZ-104)', 'AWS (EC2, S3, RDS, VPC)', 'Kubernetes (K8s)', 'Docker Containerization', 'Helm Charts', 'Clean Infrastructure']
        },
        {
          title: 'CI/CD & Observability',
          items: ['Jenkins Pipelines', 'GitHub Actions', 'Grafana NOC Dashboard', 'Prometheus Metrics', 'Zabbix Infrastructure', 'ELK / Log Analytics']
        }
      ]
    },
    {
      id: 'software',
      num: '04',
      title: 'SOFTWARE ARCHITECTURE & DATA',
      subtitle: 'Backend Engineering & Distributed Data',
      badge: 'FULL-SPECTRUM',
      groups: [
        {
          title: 'Backend Engineering',
          items: ['ASP.NET Core 8 / C#', 'Clean Architecture', 'Microservices & CQRS', 'RESTful API & gRPC', 'RabbitMQ Event Bus', 'Redis Caching & SignalR']
        },
        {
          title: 'Database & Data Resilience',
          items: ['PostgreSQL & SQL Server', 'MongoDB & NoSQL', 'Database Load Balancing', 'Event Synchronization', 'Hardware SDK / DLL Integration', 'Claude AI Engineering']
        }
      ]
    }
  ];

  selectDomain(id: string): void {
    this.activeDomainId = id;
  }
}
