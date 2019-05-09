import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SprintDto } from '../declarations/models/sprint-dto';

@Injectable({
  providedIn: 'root'
})
export class SprintsService {

  constructor(private http: HttpClient) {
  }

  getSprints(projectId: number): Observable<SprintDto[]> {
    return this.http.get<SprintDto[]>('api/projects/' + projectId + '/sprints');
  }

  addSprint(projectId: number, sprint: SprintDto): Observable<SprintDto> {
    return this.http.post<SprintDto>('api/projects/' + projectId + '/sprints', sprint);
  }
}
