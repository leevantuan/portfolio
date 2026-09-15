import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UIResourceENG } from '../../shared/lang/eng';
import { UIResourceVN } from '../../shared/lang/vn';
import { UIResourceZH } from '../../shared/lang/zh';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit, OnChanges {
  @Input() lang: string = 'ENG';

  UIResource: any = UIResourceENG;
  isSubmitted: boolean = false;

  contactForm = {
    name: '',
    email: '',
    message: '',
  };

  ngOnInit(): void {
    this.updateResource();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lang']) {
      this.updateResource();
    }
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

  onSubmit() {
    this.isSubmitted = true;
    setTimeout(() => {
      this.contactForm = { name: '', email: '', message: '' };
      this.isSubmitted = false;
    }, 4000);
  }
}
