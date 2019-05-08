import { Injectable } from '@angular/core';
import { ProjectDto } from '../declarations/models/project-dto';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  currentProject: ProjectDto;

  constructor() {
  }

  setCurrentProject(project: ProjectDto) {
    this.currentProject = project;
  }

  getCurrentProjectName(): string {
    return this.currentProject.name;
  }
}
