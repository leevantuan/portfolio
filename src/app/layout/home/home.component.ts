import { AfterViewInit, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
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

export interface ChapterRailItem {
  id: string;
  num: string;
  title: string;
}

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
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  lang: string = 'ENG';
  UIResource: any = UIResourceENG;
  isDiagramOpen: boolean = false;

  chapters: ChapterRailItem[] = [
    { id: 'topology', num: '01', title: 'Identity' },
    { id: 'story', num: '02', title: 'Origin' },
    { id: 'systems', num: '03', title: 'Systems' },
    { id: 'ai-engineering', num: '04', title: 'Automation' },
    { id: 'experience', num: '05', title: 'Experience' },
    { id: 'roadmap', num: '06', title: 'Roadmap' },
    { id: 'credentials', num: '07', title: 'Credentials' },
    { id: 'contact', num: '08', title: 'Contact' },
  ];
  activeChapter: string = 'topology';

  private scrollHandler?: () => void;
  private scrollSpyTicking: boolean = false;

  constructor(
    private sessionService: SessionService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.lang = this.sessionService.currentLang();
    this.updateResource();
  }

  ngOnInit(): void {
    this.updateResource();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.setupScrollSpy(), 150);
    }
  }

  ngOnDestroy(): void {
    if (this.scrollHandler && isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  }

  private setupScrollSpy(): void {
    this.scrollHandler = () => {
      if (this.scrollSpyTicking) return;
      this.scrollSpyTicking = true;
      requestAnimationFrame(() => {
        this.updateActiveChapter();
        this.scrollSpyTicking = false;
      });
    };
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
    this.updateActiveChapter();
  }

  private updateActiveChapter(): void {
    const scrollingElement = this.document.scrollingElement || this.document.documentElement;
    const atBottom = scrollingElement
      ? scrollingElement.scrollTop + window.innerHeight >= scrollingElement.scrollHeight - 60
      : false;

    if (atBottom) {
      this.activeChapter = this.chapters[this.chapters.length - 1].id;
      return;
    }

    const focusLine = window.innerHeight * 0.35;
    let current = this.chapters[0].id;
    for (const ch of this.chapters) {
      const el = this.document.getElementById(ch.id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      if (top <= focusLine) {
        current = ch.id;
      }
    }
    this.activeChapter = current;
  }

  scrollToChapter(id: string): void {
    const el = this.document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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
