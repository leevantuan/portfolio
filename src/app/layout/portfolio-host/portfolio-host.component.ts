import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { MobilePortfolioComponent } from '../../mobile/mobile-portfolio.component';
import { ResponsiveService } from '../../shared/services/responsive.service';

@Component({
  selector: 'app-portfolio-host',
  standalone: true,
  imports: [CommonModule, HomeComponent, MobilePortfolioComponent],
  template: `
    <ng-container *ngIf="responsiveService.isMobile(); else desktopView">
      <app-mobile-portfolio></app-mobile-portfolio>
    </ng-container>

    <ng-template #desktopView>
      <app-home></app-home>
    </ng-template>
  `,
})
export class PortfolioHostComponent {
  constructor(public responsiveService: ResponsiveService) {}
}
