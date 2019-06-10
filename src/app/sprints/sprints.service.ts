import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SprintDto } from '../declarations/models/sprint-dto';
import { SprintSummaryDto } from '../declarations/models/sprint-summary-dto';
import { JiraSprintDto } from '../declarations/models/jira-sprint-dto';
import { SprintStateDto } from '../declarations/models/sprint-state-dto';

@Injectable({
  providedIn: 'root'
})
export class SprintsService {

  constructor(private http: HttpClient) {
  }

  getSprints(projectId: number, query?: SprintsQuery): Observable<SprintDto[]> {
    let queryParameters = new HttpParams();
    if (query && query.sprintStates) {
      query.sprintStates.forEach((element) => {
        queryParameters = queryParameters.append('sprintStates', element as any);
      });
    }
    if (query && query.direction) {
      queryParameters = queryParameters.append('direction', query.direction as any);
    }
    if (query && query.limit) {
      queryParameters = queryParameters.append('limit', query.limit as any);
    }

    return this.http.get<SprintDto[]>(`api/projects/${projectId}/sprints`, { params: queryParameters });
  }

  getPreviousSprint(projectId: number, sprintId: number, sprintStates?: SprintStateDto[]) {
    let queryParameters = new HttpParams();
    if (sprintStates) {
      sprintStates.forEach((element) => {
        queryParameters = queryParameters.append('sprintStates', element as any);
      });
    }

    return this.http.get<SprintDto>(`api/projects/${projectId}/sprints/${sprintId}/prev`, { params: queryParameters });
  }

  getFollowingSprint(projectId: number, sprintId: number, sprintStates?: SprintStateDto[]) {
    let queryParameters = new HttpParams();
    if (sprintStates) {
      sprintStates.forEach((element) => {
        queryParameters = queryParameters.append('sprintStates', element as any);
      });
    }

    return this.http.get<SprintDto>(`api/projects/${projectId}/sprints/${sprintId}/next`, { params: queryParameters });
  }

  getSprintSummary(projectId: number, sprintId: number, jiraSprintId?: number): Observable<SprintSummaryDto> {
    let queryParameters = new HttpParams();
    if (jiraSprintId) {
      queryParameters = queryParameters.append('jiraSprintId', jiraSprintId as any);
    }
    return this.http.get<SprintSummaryDto>(
      `api/projects/${projectId}/sprints/${sprintId}/summary`,
      { params: queryParameters }
    );
  }

  addSprint(projectId: number, sprint: SprintDto): Observable<SprintDto> {
    return this.http.post<SprintDto>('api/projects/' + projectId + '/sprints', sprint);
  }

  updateSprint(projectId: number, sprint: SprintDto): Observable<SprintDto> {
    return this.http.patch<SprintDto>(`api/projects/${projectId}/sprints/${sprint.id}`, sprint);
  }

  getJiraSprints(projectId: number, sprint: SprintDto): Observable<JiraSprintDto[]> {
    return this.http.get<JiraSprintDto[]>(`api/projects/${projectId}/sprints/${sprint.id}/jira/sprints`);
  }
}

interface SprintsQuery {
  limit?: number;
  direction?: 'ASC' | 'DESC';
  sprintStates?: SprintStateDto[];
}
