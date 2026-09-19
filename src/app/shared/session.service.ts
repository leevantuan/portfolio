import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  // Default to Light Blueprint (07A)
  currentTheme = signal<'dark' | 'light'>('light');
  currentLang = signal<'VI' | 'ENG' | 'ZH'>('ENG');

  constructor() {
    this.initTheme();
    this.initLang();
  }

  private initTheme(): void {
    if (typeof window !== 'undefined') {
      const manualTheme = localStorage.getItem('theme_manual');
      const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
      
      let initialTheme: 'dark' | 'light';
      if (manualTheme && savedTheme) {
        // User manually selected a theme previously
        initialTheme = savedTheme;
      } else {
        // Default mode is Light for all devices (desktop and mobile)
        initialTheme = 'light';
      }
      this.setTheme(initialTheme);
    }
  }

  private initLang(): void {
    if (typeof window !== 'undefined') {
      const savedLang = (sessionStorage.getItem('lang') || localStorage.getItem('lang')) as 'VI' | 'ENG' | 'ZH' | null;
      if (savedLang && ['VI', 'ENG', 'ZH'].includes(savedLang)) {
        this.currentLang.set(savedLang);
      } else {
        this.currentLang.set('ENG');
      }
    }
  }

  setTheme(theme: 'dark' | 'light', isManual: boolean = false): void {
    this.currentTheme.set(theme);
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('theme', theme);
      if (isManual) {
        localStorage.setItem('theme_manual', 'true');
      }
    }
  }

  toggleTheme(): 'dark' | 'light' {
    const nextTheme = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme, true);
    return nextTheme;
  }

  setLang(lang: 'VI' | 'ENG' | 'ZH'): void {
    this.currentLang.set(lang);
    this.setItem('lang', lang);
  }

  setItem(key: string, value: string): void {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(key, value);
        localStorage.setItem(key, value);
      } catch (e) {
        console.warn('Storage write failed', e);
      }
    }
  }

  getItem(key: string): string | null {
    if (typeof window !== 'undefined') {
      try {
        return sessionStorage.getItem(key) || localStorage.getItem(key);
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  removeItem(key: string): void {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(key);
      localStorage.removeItem(key);
    }
  }

  clearAll(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
      localStorage.clear();
    }
  }
}
