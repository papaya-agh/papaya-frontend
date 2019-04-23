import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthErrorHandler implements ErrorHandler {

  constructor(private injector: Injector,
              private authService: AuthService,
              private zone: NgZone) {
  }

  handleError(error) {
    console.log(error);
    const router = this.injector.get(Router);
    if (error.status === 401 || error.status === 403) {
      this.authService.logout();
      this.zone.run(() => router.navigate([ '/login' ]));
    }

    throw error;
  }
}
