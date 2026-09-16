import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile-credentials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-credentials.component.html',
  styleUrl: './mobile-credentials.component.css'
})
export class MobileCredentialsComponent {
  @Input() lang: string = 'ENG';
  @Input() UIResource: any;

  trackByCred(index: number, item: any): string {
    return item?.code || index.toString();
  }
}
