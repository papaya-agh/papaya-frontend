import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SprintSummaryDto } from '../declarations/models/sprint-summary-dto';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private http: HttpClient) {}

  getSprintSummary(projectId: number, sprintId: number): Observable<SprintSummaryDto> {
    return this.http.get<SprintSummaryDto>(`api/projects/${projectId}/sprints/${sprintId}/summary`);
  }
}
