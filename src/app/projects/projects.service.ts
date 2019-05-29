import { Injectable } from '@angular/core';
import { ProjectDto } from '../declarations/models/project-dto';
import { ProjectMemberDto } from '../declarations/models/project-member-dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserIdentificationDto } from '../declarations/models/user-identification-dto';
import { JiraConfigDto } from '../declarations/models/jira-config-dto';
import { JiraBoardDto } from '../declarations/models/jira-board-dto';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) {
  }

  getProjects(): Observable<ProjectDto[]> {
    return this.http.get<ProjectDto[]>('api/projects/');
  }

  getProject(projectId: number): Observable<ProjectDto> {
    return this.http.get<ProjectDto>(`api/projects/${projectId}`);
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

  setMemberRole(user: ProjectMemberDto, userId: string, projectId: number): Observable<ProjectMemberDto> {
    const body: ProjectMemberDto = { role: user.role, user: null };
    return this.http.put(`api/projects/${projectId}/members/${userId}`, body);
  }

  removeMember(userId: string, projectId: number): Observable<any> {
    return this.http.delete(`api/projects/${projectId}/members/${userId}`);
  }

  getJiraKey(): Observable<any> {
    return this.http.get(`api/jira/key`);
  }

  getJiraConfig(projectId: number): Observable<any> {
    return this.http.get(`api/projects/${projectId}/jira/config`);
  }

  setJiraConfig(projectId: number, jiraConfig: JiraConfigDto): Observable<any> {
    return this.http.put(`api/projects/${projectId}/jira/secret`, jiraConfig);
  }

  getJiraProjects(projectId: number): Observable<any> {
    return this.http.get(`api/projects/${projectId}/jira/projects`);
  }

  setJiraProject(projectId: number, chosenBoard: JiraBoardDto): Observable<any> {
    return this.http.put(`api/projects/${projectId}/jira/projects`, chosenBoard);
  }
}
