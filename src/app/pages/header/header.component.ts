import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../shared/session.service';
import { UIResourceENG } from '../../shared/lang/eng';
import { UIResourceVN } from '../../shared/lang/vn';
import { UIResourceZH } from '../../shared/lang/zh';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  @Output() langChange = new EventEmitter<string>();

  lang: string = 'VI';
  currentTheme: 'dark' | 'light' = 'dark';
  UIResource: any = UIResourceVN;
  mobileMenuOpen: boolean = false;

  constructor(public sessionService: SessionService) {
    this.lang = this.sessionService.currentLang();
    this.currentTheme = this.sessionService.currentTheme();
    this.updateResource();
  }

  ngOnInit(): void {
    this.updateResource();
    this.currentTheme = this.sessionService.currentTheme();
  }

  toggleTheme(): void {
    this.currentTheme = this.sessionService.toggleTheme();
  }

  onLangSelect(value: string): void {
    this.lang = value;
    this.sessionService.setLang(value as any);
    this.langChange.emit(value);
    this.updateResource();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
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

  openResume(): void {
    window.open(
      'https://static.topcv.vn/topcv-cv-uploads/79561995b822783d9e4198be1c9a7a18.pdf#toolbar=0&navpanes=0&scrollbar=0',
      '_blank'
    );
  }
}
