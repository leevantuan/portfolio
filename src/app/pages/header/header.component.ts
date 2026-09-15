import { AfterViewInit, Component, EventEmitter, Inject, OnDestroy, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../shared/session.service';
import { UIResourceENG } from '../../shared/lang/eng';
import { UIResourceVN } from '../../shared/lang/vn';
import { UIResourceZH } from '../../shared/lang/zh';

export interface NavItem {
  id: string;
  num: string;
  label: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() langChange = new EventEmitter<string>();

  lang: string = 'ENG';
  currentTheme: 'dark' | 'light' = 'dark';
  UIResource: any = UIResourceENG;
  mobileMenuOpen: boolean = false;

  navItems: NavItem[] = [
    { id: 'topology', num: '01', label: 'Topology' },
    { id: 'skills', num: '02', label: 'Skills Matrix' },
    { id: 'roadmap', num: '03', label: 'Roadmap & Telemetry' },
    { id: 'credentials', num: '04', label: 'Credentials' },
    { id: 'experience', num: '05', label: 'Experience' },
    { id: 'contact', num: '06', label: 'Contact' },
  ];
  activeSection: string = 'topology';

  private scrollHandler?: () => void;
  private scrollSpyTicking: boolean = false;

  constructor(
    public sessionService: SessionService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.lang = this.sessionService.currentLang();
    this.currentTheme = this.sessionService.currentTheme();
    this.updateResource();
  }

  ngOnInit(): void {
    this.updateResource();
    this.currentTheme = this.sessionService.currentTheme();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Sections live in HomeComponent's template (siblings of this header), so wait a
      // tick for them to be in the DOM before wiring up the scroll-spy.
      setTimeout(() => this.setupScrollSpy());
    }
  }

  ngOnDestroy(): void {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  }

  private setupScrollSpy(): void {
    this.scrollHandler = () => {
      if (this.scrollSpyTicking) return;
      this.scrollSpyTicking = true;
      requestAnimationFrame(() => {
        this.updateActiveSection();
        this.scrollSpyTicking = false;
      });
    };
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
    this.updateActiveSection();
  }

  // Scans sections top-to-bottom (rather than relying on a narrow intersection band, which
  // can miss a section entirely once a smooth-scroll from a nav click settles just past it)
  // and picks the last one whose top has crossed the focus line just below the fixed header.
  private updateActiveSection(): void {
    const scrollingElement = this.document.scrollingElement || this.document.documentElement;
    const atBottom = scrollingElement
      ? scrollingElement.scrollTop + window.innerHeight >= scrollingElement.scrollHeight - 2
      : false;
    if (atBottom) {
      // The last section may never be tall enough to push its own top up to the focus
      // line (nothing left below it to scroll further), so treat reaching the bottom
      // of the page as a special case rather than leaving the previous section active.
      this.activeSection = this.navItems[this.navItems.length - 1].id;
      return;
    }

    const focusLine = 96;
    let current = this.navItems[0].id;
    for (const item of this.navItems) {
      const el = this.document.getElementById(item.id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= focusLine) {
        current = item.id;
      }
    }
    this.activeSection = current;
  }

  isActive(id: string): boolean {
    return this.activeSection === id;
  }

  setActiveSection(id: string): void {
    this.activeSection = id;
  }

  trackByNavId(_index: number, item: NavItem): string {
    return item.id;
  }

  toggleTheme(): void {
    this.currentTheme = this.sessionService.toggleTheme();
  }

  onLangSelect(value: string): void {
    this.lang = value;
    this.sessionService.setLang(value as any);
    this.langChange.emit(value);
    this.updateResource();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
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

  openResume(): void {
    window.open(
      'https://static.topcv.vn/topcv-cv-uploads/79561995b822783d9e4198be1c9a7a18.pdf#toolbar=0&navpanes=0&scrollbar=0',
      '_blank'
    );
  }
}
