import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-footer.component.html',
  styleUrl: './mobile-footer.component.css'
})
export class MobileFooterComponent {
  @Input() lang: string = 'ENG';
  readonly currentYear: number = new Date().getFullYear();
}
