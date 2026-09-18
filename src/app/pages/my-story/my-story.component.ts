import { 
  AfterViewInit, 
  ChangeDetectorRef, 
  Component, 
  ElementRef, 
  Inject, 
  Input, 
  NgZone, 
  OnChanges, 
  OnDestroy, 
  OnInit, 
  PLATFORM_ID, 
  SimpleChanges, 
  ViewChild 
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { UIResourceENG } from '../../shared/lang/eng';
import { UIResourceVN } from '../../shared/lang/vn';
import { UIResourceZH } from '../../shared/lang/zh';

@Component({
  selector: 'app-my-story',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-story.component.html',
  styleUrl: './my-story.component.css'
})
export class MyStoryComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() lang: string = 'ENG';
  @Input() UIResource: any;

  @ViewChild('storyGrid') storyGridRef?: ElementRef;

  storyData: any;
  storyState: 'below' | 'active' | 'above' = 'below';
  get isStoryInView(): boolean {
    return this.storyState === 'active';
  }

  private scrollCleanup?: () => void;
  private ticking = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.updateData();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollSpy();
    }
  }

  ngOnDestroy(): void {
    if (this.scrollCleanup) {
      this.scrollCleanup();
    }
  }

  private setupScrollSpy(): void {
    if (!this.storyGridRef?.nativeElement) {
      this.storyState = 'active';
      return;
    }

    const checkPosition = () => {
      const el = this.storyGridRef?.nativeElement;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const height = rect.height || 400;

      let newState: 'below' | 'active' | 'above';

      // 90% scroll past threshold: only triggers exit when ~90% of the section has scrolled past
      // When scrolling back up, seamlessly re-enters active state
      const isPast90 = this.storyState === 'above'
        ? (rect.top < -height * 0.82 || rect.bottom < 80)
        : (rect.top < -height * 0.90 || rect.bottom < 50);

      if (rect.top >= vh * 0.88) {
        newState = 'below';
      } else if (isPast90) {
        newState = 'above';
      } else {
        newState = 'active';
      }

      if (newState !== this.storyState) {
        this.storyState = newState;
        this.cdr.markForCheck();
      }
    };

    this.ngZone.runOutsideAngular(() => {
      const onScroll = () => {
        if (!this.ticking) {
          window.requestAnimationFrame(() => {
            this.ngZone.run(() => checkPosition());
            this.ticking = false;
          });
          this.ticking = true;
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });

      this.scrollCleanup = () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      };

      // Initial check on mount
      setTimeout(() => checkPosition(), 50);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lang'] || changes['UIResource']) {
      this.updateData();
    }
  }

  private updateData(): void {
    if (this.UIResource && this.UIResource.my_story) {
      this.storyData = this.UIResource.my_story;
      return;
    }

    switch (this.lang) {
      case 'VI':
        this.storyData = UIResourceVN.my_story;
        break;
      case 'ZH':
        this.storyData = UIResourceZH.my_story;
        break;
      case 'ENG':
      default:
        this.storyData = UIResourceENG.my_story;
        break;
    }
  }
}
