import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {

  constructor() { }

  mockAvailability = {
    sprint: 3,
    startDate: '10/11/2012',
    endDate: '13/11/2013',
  }

  getAvailability(): Observable<Object> {
    return of(this.mockAvailability);
  }

  addAvailability(availability: Object): void {
    //TODO: czekam na api
  }
}
