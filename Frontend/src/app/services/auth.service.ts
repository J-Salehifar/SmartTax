import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, switchMap, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  private refreshing = false;
  private refreshSubject = new BehaviorSubject<string | null>(null);

  // ✅ دسترسی به توکن Access
  getAccessToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('access');
    }
    return null;
  }

  // ✅ ذخیره access و refresh
  setTokens(access: string, refresh: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);
    }
  }

  // ✅ Logout امن
  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    }
    this.router.navigateByUrl('/login');
  }

  // ✅ بررسی ورود کاربر (برای Navbar و Guard)
  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('access');
    }
    return false;
  }

  // ✅ Refresh Token خودکار
  refreshToken() {
    if (this.refreshing) {
      return this.refreshSubject.pipe(
        filter(token => token !== null),
        take(1)
      );
    }

    this.refreshing = true;
    this.refreshSubject.next(null);

    return this.http.post<any>(
      'http://127.0.0.1:8000/api/auth/refresh/',
      { refresh: localStorage.getItem('refresh') }
    ).pipe(
      switchMap(res => {
        this.refreshing = false;
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('access', res.access);
        }
        this.refreshSubject.next(res.access);
        return this.refreshSubject.pipe(take(1));
      })
    );
  }
}
