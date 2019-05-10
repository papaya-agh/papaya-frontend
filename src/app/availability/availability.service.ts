import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AvailabilityDto } from '../declarations/models/availability-dto';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {

  constructor(private http: HttpClient) {
  }

  getUserAvailability(projectId: number, sprintId: number): Observable<AvailabilityDto> {
    return this.http.get<AvailabilityDto>(`api/projects/${projectId}/sprints/${sprintId}/availability`);
  }

  updateUserAvailability(projectId: number, sprintId: number, userAvailability: AvailabilityDto): Observable<AvailabilityDto> {
    return this.http.put<AvailabilityDto>(`api/projects/${projectId}/sprints/${sprintId}/availability`, userAvailability);
  }
}
