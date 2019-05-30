import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from '../projects.service';
import { MessageService } from 'primeng/api';
import { StoreService } from '../../p-common/store.service';
import { JiraConfigDto } from '../../declarations/models/jira-config-dto';
import { ProjectDto } from '../../declarations/models/project-dto';

@Component({
  selector: 'app-jira-config',
  templateUrl: './jira-config.component.html',
  styleUrls: [ './jira-config.component.css' ]
})
export class JiraConfigComponent implements OnInit {

  jiraConfig: JiraConfigDto;
  currentProject: ProjectDto;

  constructor(private router: Router,
              private projectsService: ProjectsService,
              private storeService: StoreService,
              private messageService: MessageService) {
    this.currentProject = this.storeService.getCurrentProject();
    this.jiraConfig = {
      key: '',
      secret: '',
      url: ''
    };
  }

  ngOnInit() {
    if (!this.currentProject) {
      this.router.navigate([ '/projects' ]);
      return;
    }
    this.projectsService.getJiraConfig(this.currentProject.id)
      .subscribe(response => {
        this.jiraConfig = response;
      });
  }

  handleClick() {
    if (!this.jiraConfig.secret) {
      this.messageService.add({ severity: 'error', summary: 'Błąd', detail: 'Podaj kod!' });
      return;
    }

    this.projectsService.setJiraConfig(this.currentProject.id, this.jiraConfig)
      .subscribe(response => {
          this.jiraConfig = response;
          this.router.navigateByUrl('/projects/jira-projects');
        },
        () => {
          this.messageService.add({ severity: 'error', summary: 'Błąd', detail: 'Niepoprawny kod!' });
        });
  }
}
