import { Component, Input } from '@angular/core';
import { SessionService } from '../../shared/session.service';
import { UIResourceENG } from '../../shared/lang/eng';
import { UIResourceVN } from '../../shared/lang/vn';

@Component({
  selector: 'app-greeting',
  imports: [],
  templateUrl: './greeting.component.html',
  styleUrl: './greeting.component.css',
})
export class GreetingComponent {
  @Input() lang: string = 'ENG';

  UIResource: any;

  ngOnChanges(): void {
    this.UIResource = this.lang === 'VN' ? UIResourceVN : UIResourceENG;
  }
}
