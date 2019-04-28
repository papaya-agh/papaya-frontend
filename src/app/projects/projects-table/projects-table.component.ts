import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { ProjectDto } from '../../declarations/models/project-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: [ './projects-table.component.css' ]
})
export class ProjectsTableComponent implements OnInit {

  projects: ProjectDto[];

  constructor(private router: Router,
              private projectService: ProjectsService) {
  }

  ngOnInit() {
    this.projectService.getProjects()
      .subscribe(response => this.projects = response);
  }

  chooseProject(name) {
    localStorage.setItem('papaya-project', name);
    this.router.navigateByUrl('/example');
  }

}
