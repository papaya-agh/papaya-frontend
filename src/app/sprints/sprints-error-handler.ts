import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class SprintsErrorHandler implements ErrorHandler {

  constructor(private injector: Injector,
              private zone: NgZone) {
  }

  handleError(error) {
    console.log(error);
    const router = this.injector.get(Router);
    if (error.status === 500) {
      this.zone.run(() => router.navigate([ '/#/sprints/new-sprint' ]));
    }
    throw error;
  }
}
