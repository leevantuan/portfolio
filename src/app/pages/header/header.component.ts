import { Component, EventEmitter, Output } from '@angular/core';
import { SessionService } from '../../shared/session.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UIResourceENG } from '../../shared/lang/eng';
import { UIResourceVN } from '../../shared/lang/vn';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output() langChange = new EventEmitter<string>();

  lang: string = 'ENG';
  UIResource: any;

  constructor(private sessionService: SessionService) {
    const langCurrent = sessionService.getItem('lang');
    if (langCurrent) {
      this.lang = langCurrent;
    } else {
      sessionService.setItem('lang', this.lang);
    }
    this.UIResource = langCurrent === 'ENG' ? UIResourceENG : UIResourceVN;
  }

  logLanguage(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.lang = value;
    this.sessionService.setItem('lang', value);
    this.langChange.emit(value);
    this.UIResource = value === 'VN' ? UIResourceVN : UIResourceENG;
  }

  openLink() {
    window.open(
      'https://static.topcv.vn/topcv-cv-uploads/79561995b822783d9e4198be1c9a7a18.pdf#toolbar=0&navpanes=0&scrollbar=0',
      'resume'
    );
  }
}
