import { Component, Input, OnChanges, OnInit, OnDestroy, SimpleChanges, ElementRef, AfterViewInit } from '@angular/core';
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
export class RoadmapComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @Input() lang: string = 'ENG';

  UIResource: any = UIResourceENG;

  // Real-time telemetry histogram bars (Grafana style)
  telemetryBars: number[] = [
    35, 55, 42, 70, 64, 88, 52, 94, 76, 68, 92, 84,
    60, 75, 82, 96, 78, 65, 88, 92, 74, 85, 90, 78
  ];

  private telemetryTimer: any;
  private observer?: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.updateResource();
    this.startLiveTelemetry();
  }

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lang']) {
      this.updateResource();
      setTimeout(() => this.revealAll());
    }
  }

  trackByLevel(_index: number, lvl: { level: number | string }): number | string {
    return lvl.level;
  }

  ngOnDestroy(): void {
    if (this.telemetryTimer) {
      clearInterval(this.telemetryTimer);
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      this.revealAll();
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
          this.observer?.unobserve(entry.target);
        }
      });
    }, options);

    const targets = this.el.nativeElement.querySelectorAll('.gnome-reveal-item');
    targets.forEach((target: Element) => {
      this.observer?.observe(target);
    });
  }

  private revealAll(): void {
    const targets = this.el.nativeElement.querySelectorAll('.gnome-reveal-item');
    targets.forEach((target: Element) => {
      target.classList.add('is-revealed');
    });
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
