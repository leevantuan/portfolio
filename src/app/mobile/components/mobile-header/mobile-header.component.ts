import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../../shared/session.service';

@Component({
  selector: 'app-mobile-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mobile-header.component.html',
  styleUrl: './mobile-header.component.css'
})
export class MobileHeaderComponent {
  @Input() lang: string = 'ENG';
  @Output() langChange = new EventEmitter<string>();

  isMenuOpen: boolean = false;

  constructor(private sessionService: SessionService) {}

  get currentTheme(): 'dark' | 'light' {
    return this.sessionService.currentTheme();
  }

  toggleTheme(): void {
    this.sessionService.toggleTheme();
  }

  onLangSelect(val: string): void {
    this.lang = val;
    this.langChange.emit(val);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  openResume(): void {
    const cvUrl = 'https://drive.google.com/drive/folders/170wZ896pYJ0QO_V3W3790iJp-z3F67eE?usp=sharing';
    window.open(cvUrl, '_blank');
  }
}
