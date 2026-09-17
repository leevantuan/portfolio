import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../pages/header/header.component';
import { GlobalNetworkComponent } from '../../pages/global-network/global-network.component';
import { InfrastructureHudComponent } from '../../pages/infrastructure-hud/infrastructure-hud.component';
import { SkillsComponent } from '../../pages/skills/skills.component';
import { RoadmapComponent } from '../../pages/roadmap/roadmap.component';
import { CredentialsComponent } from '../../pages/credentials/credentials.component';
import { ExperienceComponent } from '../../pages/experience/experience.component';
import { DiagramViewerComponent } from '../../pages/diagram-viewer/diagram-viewer.component';
import { ContactComponent } from '../../pages/contact/contact.component';
import { FooterComponent } from '../../pages/footer/footer.component';
import { MyStoryComponent } from '../../pages/my-story/my-story.component';
import { NetworkBgComponent } from '../../shared/network-bg/network-bg.component';
import { SessionService } from '../../shared/session.service';
import { UIResourceENG } from '../../shared/lang/eng';
import { UIResourceVN } from '../../shared/lang/vn';
import { UIResourceZH } from '../../shared/lang/zh';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    GlobalNetworkComponent,
    InfrastructureHudComponent,
    MyStoryComponent,
    SkillsComponent,
    RoadmapComponent,
    CredentialsComponent,
    ExperienceComponent,
    DiagramViewerComponent,
    ContactComponent,
    FooterComponent,
    NetworkBgComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
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

  handleLangChange(event: string) {
    this.lang = event;
    this.sessionService.setLang(event as any);
    this.updateResource();
  }

  openArchitectureModal() {
    this.isDiagramOpen = true;
  }

  closeArchitectureModal() {
    this.isDiagramOpen = false;
  }

  private updateResource() {
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
