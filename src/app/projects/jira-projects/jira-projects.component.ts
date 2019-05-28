import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from '../projects.service';
import { StoreService } from '../../p-common/store.service';
import { MessageService } from 'primeng/api';
import { ProjectDto } from '../../declarations/models/project-dto';

@Component({
  selector: 'app-jira-projects',
  templateUrl: './jira-projects.component.html',
  styleUrls: ['./jira-projects.component.css']
})
export class JiraProjectsComponent implements OnInit {

  jiraProjects: ProjectDto[];
  chosenProject: ProjectDto;
  projectId: number;

  constructor(private router: Router,
              private projectsService: ProjectsService,
              private storeService: StoreService,
              private messageService: MessageService) {
    this.projectId = this.storeService.getCurrentProjectId();
  }

  ngOnInit() {
    this.projectsService.getJiraProjects(this.projectId)
      .subscribe(response => {
        this.jiraProjects = response;
      });
  }

  handleClick() {
    if (!this.chosenProject) {
      this.messageService.add({ severity: 'error', summary: 'Błąd', detail: 'Nie wybrano projektu!' });
      return;
    }

    this.projectsService.setJiraProject(this.projectId, this.chosenProject)
      .subscribe(response => {
        this.chosenProject = response;
        setTimeout(() => this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Konfiguracja pomyślna!' }));
        this.router.navigateByUrl('/projects');
      });
  }
}
