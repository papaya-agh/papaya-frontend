import { Injectable } from '@angular/core';
import { ProjectDto } from '../declarations/models/project-dto';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  currentProject: ProjectDto;

  currentUserId: number;

  constructor() {
  }

  setCurrentProject(project: ProjectDto) {
    this.currentProject = project;
  }

  getCurrentProject(): ProjectDto {
    return this.currentProject;
  }

  getCurrentProjectName(): string {
    return this.currentProject.name;
  }

  getCurrentProjectId(): number {
    return this.currentProject.id;
  }
}
