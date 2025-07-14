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

  openLink() {
    window.open(
      'https://static.topcv.vn/topcv-cv-uploads/79561995b822783d9e4198be1c9a7a18.pdf#toolbar=0&navpanes=0&scrollbar=0',
      'resume'
    );
  }
}
