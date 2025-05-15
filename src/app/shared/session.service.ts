import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  setItem(key: string, value: string) {
    if (
      typeof window !== 'undefined' &&
      typeof sessionStorage !== 'undefined'
    ) {
      sessionStorage.setItem(key, value);
    }
  }

  getItem(key: string): string | null {
    if (
      typeof window !== 'undefined' &&
      typeof sessionStorage !== 'undefined'
    ) {
      return sessionStorage.getItem(key);
    }
    return null;
  }

  removeItem(key: string) {
    if (
      typeof window !== 'undefined' &&
      typeof sessionStorage !== 'undefined'
    ) {
      sessionStorage.removeItem(key);
    }
  }

  clearAll() {
    sessionStorage.clear();
  }
}
