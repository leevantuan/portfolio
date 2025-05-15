import { Component, Input } from '@angular/core';
import { SessionService } from '../../shared/session.service';
import { UIResourceENG } from '../../shared/lang/eng';
import { UIResourceVN } from '../../shared/lang/vn';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  @Input() lang: string = 'ENG';

  UIResource: any;

  ngOnChanges(): void {
    this.UIResource = this.lang === 'VN' ? UIResourceVN : UIResourceENG;
  }
}
