import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIResourceENG } from '../../shared/lang/eng';
import { UIResourceVN } from '../../shared/lang/vn';
import { UIResourceZH } from '../../shared/lang/zh';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit, OnChanges {
  @Input() lang: string = 'VI';

  UIResource: any = UIResourceVN;

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
}
