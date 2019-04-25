import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { ProjectDto } from '../../declarations/models/project-dto';

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: [ './projects-table.component.css' ]
})
export class ProjectsTableComponent implements OnInit {

  newCoef = 1.55;
  newName: string;
  projects: ProjectDto[];
  id: number;

  constructor(private projectService: ProjectsService) {
  }

  ngOnInit() {
    this.projectService.getProjects().subscribe(response => this.projects = response);
  }

  handleClick() {
    this.projectService.addProject(
      {
        id: null,
        name: this.newName,
        description: 'sample',
        initialCoefficient: this.newCoef,
      }
    ).subscribe(response => this.id = response.id);

    this.projectService.getProjects().subscribe(response => this.projects = response);
  }
}
