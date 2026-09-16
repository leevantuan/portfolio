import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileHeaderComponent } from './components/mobile-header/mobile-header.component';
import { MobileHeroComponent } from './components/mobile-hero/mobile-hero.component';
import { MobileSkillsComponent } from './components/mobile-skills/mobile-skills.component';
import { MobileRoadmapComponent } from './components/mobile-roadmap/mobile-roadmap.component';
import { MobileCredentialsComponent } from './components/mobile-credentials/mobile-credentials.component';
import { MobileExperienceComponent } from './components/mobile-experience/mobile-experience.component';
import { MobileContactComponent } from './components/mobile-contact/mobile-contact.component';
import { MobileFooterComponent } from './components/mobile-footer/mobile-footer.component';
import { DiagramViewerComponent } from '../pages/diagram-viewer/diagram-viewer.component';
import { SessionService } from '../shared/session.service';
import { UIResourceENG } from '../shared/lang/eng';
import { UIResourceVN } from '../shared/lang/vn';
import { UIResourceZH } from '../shared/lang/zh';

@Component({
  selector: 'app-mobile-portfolio',
  standalone: true,
  imports: [
    CommonModule,
    MobileHeaderComponent,
    MobileHeroComponent,
    MobileSkillsComponent,
    MobileRoadmapComponent,
    MobileCredentialsComponent,
    MobileExperienceComponent,
    MobileContactComponent,
    MobileFooterComponent,
    DiagramViewerComponent,
  ],
  templateUrl: './mobile-portfolio.component.html',
  styleUrl: './mobile-portfolio.component.css'
})
export class MobilePortfolioComponent implements OnInit {
  lang: string = 'ENG';
  UIResource: any = UIResourceENG;
  isDiagramOpen: boolean = false;

  constructor(private sessionService: SessionService) {
    this.lang = this.sessionService.currentLang();
    this.updateResource();
  }

  ngOnInit(): void {
    this.updateResource();
  }

  handleLangChange(event: string): void {
    this.lang = event;
    this.sessionService.setLang(event as any);
    this.updateResource();
  }

  openArchitectureModal(): void {
    this.isDiagramOpen = true;
  }

  closeArchitectureModal(): void {
    this.isDiagramOpen = false;
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
