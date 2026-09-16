import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile-roadmap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-roadmap.component.html',
  styleUrl: './mobile-roadmap.component.css'
})
export class MobileRoadmapComponent {
  @Input() lang: string = 'ENG';
  @Input() UIResource: any;

  trackByLevel(index: number, item: any): string {
    return item?.level || index.toString();
  }
}
