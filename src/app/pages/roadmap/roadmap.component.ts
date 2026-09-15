import { Component, Input, OnChanges, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIResourceVN } from '../../shared/lang/vn';
import { UIResourceENG } from '../../shared/lang/eng';
import { UIResourceZH } from '../../shared/lang/zh';

@Component({
  selector: 'app-roadmap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roadmap.component.html',
  styleUrl: './roadmap.component.css',
})
export class RoadmapComponent implements OnInit, OnChanges, OnDestroy {
  @Input() lang: string = 'VI';

  UIResource: any = UIResourceVN;

  // Real-time telemetry histogram bars (Grafana style)
  telemetryBars: number[] = [
    35, 55, 42, 70, 64, 88, 52, 94, 76, 68, 92, 84,
    60, 75, 82, 96, 78, 65, 88, 92, 74, 85, 90, 78
  ];

  private telemetryTimer: any;

  ngOnInit(): void {
    this.updateResource();
    this.startLiveTelemetry();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lang']) {
      this.updateResource();
    }
  }

  ngOnDestroy(): void {
    if (this.telemetryTimer) {
      clearInterval(this.telemetryTimer);
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

  private startLiveTelemetry(): void {
    if (typeof window !== 'undefined') {
      this.telemetryTimer = setInterval(() => {
        this.telemetryBars = this.telemetryBars.map((val) => {
          const delta = (Math.random() - 0.5) * 16;
          return Math.min(100, Math.max(25, Math.round(val + delta)));
        });
      }, 2500);
    }
  }
}
