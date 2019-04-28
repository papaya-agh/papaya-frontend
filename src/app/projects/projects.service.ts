import { Injectable } from '@angular/core';
import { ProjectDto } from '../declarations/models/project-dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectMemberDto } from '../declarations/models/project-member-dto';
import { UserIdentificationDto } from '../declarations/models/user-identification-dto';

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

  getMembers(projectId: number): Observable<ProjectMemberDto[]> {
    return this.http.get<ProjectMemberDto[]>(`api/projects/${projectId}/members`);
  }

  addMember(userIdentification: UserIdentificationDto, projectId: number): Observable<ProjectMemberDto> {
    return this.http.post<ProjectMemberDto>(`api/projects/${projectId}/members`, userIdentification);
  }

  setMemberRole(user: ProjectMemberDto, userId: number, projectId: number): Observable<ProjectMemberDto> {
    const body: ProjectMemberDto = {role: user.role, user: null};
    return this.http.put(`api/projects/${projectId}/members/${userId}`, body);
  }

  removeMember(userId: number, projectId: number): Observable<any> {
    return this.http.delete(`api/projects/${projectId}/members/${userId}`);
  }

}
