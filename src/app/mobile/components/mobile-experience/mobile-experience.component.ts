import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-experience.component.html',
  styleUrl: './mobile-experience.component.css'
})
export class MobileExperienceComponent {
  @Input() lang: string = 'ENG';
  @Input() UIResource: any;

  trackByExp(index: number, item: any): string {
    return item?.company || index.toString();
  }
}
