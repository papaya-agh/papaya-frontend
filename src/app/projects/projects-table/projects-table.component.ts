import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { ProjectDto } from '../../declarations/models/project-dto';
import { Router } from '@angular/router';
import { StoreService } from '../../p-common/store.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.css']
})
export class ProjectsTableComponent implements OnInit {

  projects: ProjectDto[];

  isLoading = true;

  constructor(private router: Router,
              private projectsService: ProjectsService,
              private storeService: StoreService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.projectsService.getProjects()
      .subscribe(response => {
        this.isLoading = false;
        this.projects = response;
      });
  }

  handleClick(project) {
    this.storeService.setCurrentProject(project);
    if (!project.jiraBoard) {
      setTimeout(() => this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Skonfiguruj Jirę!'
      }));
      this.router.navigateByUrl('/projects/jira-key');
    } else {
      this.router.navigateByUrl('/overview');
    }
  }
}
