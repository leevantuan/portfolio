import { Injectable, signal, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService implements OnDestroy {
  // Mobile breakpoint: screens narrower than 1024px
  readonly isMobile = signal<boolean>(false);
  private resizeListener: (() => void) | null = null;

  constructor() {
    this.initBreakpointListener();
  }

  private initBreakpointListener(): void {
    if (typeof window !== 'undefined') {
      const checkBreakpoint = () => {
        const mobile = window.innerWidth < 1024;
        if (this.isMobile() !== mobile) {
          this.isMobile.set(mobile);
        }
      };

      // Initial check
      checkBreakpoint();

      // Listen to resize
      this.resizeListener = checkBreakpoint;
      window.addEventListener('resize', this.resizeListener, { passive: true });
    }
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined' && this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }
}
