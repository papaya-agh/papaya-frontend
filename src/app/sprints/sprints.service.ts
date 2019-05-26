import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SprintDto } from '../declarations/models/sprint-dto';
import { SprintSummaryDto } from '../declarations/models/sprint-summary-dto';

@Injectable({
  providedIn: 'root'
})
export class SprintsService {

  constructor(private http: HttpClient) {
  }

  getSprints(projectId: number, sprintStates?: string[]): Observable<SprintDto[]> {
    let queryParameters = new HttpParams();
    if (sprintStates) {
      sprintStates.forEach((element) => {
        queryParameters = queryParameters.append('sprintStates', element as any);
      });
    }

    return this.http.get<SprintDto[]>(`api/projects/${projectId}/sprints`, { params: queryParameters });
  }

  getSprintSummary(projectId: number, sprintId: number): Observable<SprintSummaryDto> {
    return this.http.get<SprintSummaryDto>(`api/projects/${projectId}/sprints/${sprintId}/summary`);
  }

  addSprint(projectId: number, sprint: SprintDto): Observable<SprintDto> {
    return this.http.post<SprintDto>('api/projects/' + projectId + '/sprints', sprint);
  }

  updateSprint(projectId: number, sprint: SprintDto): Observable<SprintDto> {
    return this.http.patch<SprintDto>(`api/projects/${projectId}/sprints/${sprint.id}`, sprint);
  }
}
