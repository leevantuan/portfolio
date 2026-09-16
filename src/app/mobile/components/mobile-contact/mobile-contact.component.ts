import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-contact.component.html',
  styleUrl: './mobile-contact.component.css'
})
export class MobileContactComponent {
  @Input() lang: string = 'ENG';
  @Input() UIResource: any;

  openResume(): void {
    const cvUrl = 'https://drive.google.com/drive/folders/170wZ896pYJ0QO_V3W3790iJp-z3F67eE?usp=sharing';
    window.open(cvUrl, '_blank');
  }
}
