import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../shared/session.service';
import { UIResourceENG } from '../../shared/lang/eng';
import { UIResourceVN } from '../../shared/lang/vn';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  @Input() lang: string = 'ENG';

  UIResource: any;

  ngOnChanges(): void {
    this.UIResource = this.lang === 'VN' ? UIResourceVN : UIResourceENG;
  }

  contactForm = {
    name: '',
    email: '',
    message: '',
  };

  onSubmit() {
    alert('Cảm ơn! Tin nhắn của bạn đã được gửi.');
    this.contactForm = { name: '', email: '', message: '' }; // Reset form
    if (
      this.contactForm.name &&
      this.contactForm.email &&
      this.contactForm.message
    ) {
      // Gửi dữ liệu tới server hoặc xử lý logic ở đây
    }
  }
}
