import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { MobilePortfolioComponent } from '../../mobile/mobile-portfolio.component';
import { ResponsiveService } from '../../shared/services/responsive.service';
import { WelcomeModalComponent } from '../../shared/components/welcome-modal/welcome-modal.component';

@Component({
  selector: 'app-portfolio-host',
  standalone: true,
  imports: [CommonModule, HomeComponent, MobilePortfolioComponent, WelcomeModalComponent],
  template: `
    <ng-container *ngIf="responsiveService.isMobile(); else desktopView">
      <app-mobile-portfolio></app-mobile-portfolio>
      <app-welcome-modal></app-welcome-modal>
    </ng-container>

    <ng-template #desktopView>
      <app-home></app-home>
      <app-welcome-modal></app-welcome-modal>
    </ng-template>
  `,
})
export class PortfolioHostComponent {
  constructor(public responsiveService: ResponsiveService) {}
}
