import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { ProjectDto } from '../../declarations/models/project-dto';
import { Router } from '@angular/router';
import { StoreService } from '../../p-common/store.service';

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: [ './projects-table.component.css' ]
})
export class ProjectsTableComponent implements OnInit {

  projects: ProjectDto[];

  constructor(private router: Router,
              private projectsService: ProjectsService,
              private storeService: StoreService) {
  }

  ngOnInit() {
    this.projectsService.getProjects()
      .subscribe(response => this.projects = response);
  }

  handleClick(project) {
    this.storeService.setCurrentProject(project);
    this.router.navigateByUrl('/example');
  }

}
