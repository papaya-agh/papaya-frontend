import { Injectable } from '@angular/core';
import { ProjectDto } from '../declarations/models/project-dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) {
  }

  getProjects(): Observable<ProjectDto[]> {
    return this.http.get<ProjectDto[]>('api/projects');
  }

  addProject(project: ProjectDto): Observable<ProjectDto> {
    return this.http.post<ProjectDto>('api/projects', project);
  }
}
