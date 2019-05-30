import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from '../projects.service';
import { MessageService } from 'primeng/api';
import { StoreService } from '../../p-common/store.service';
import { JiraConfigDto } from '../../declarations/models/jira-config-dto';

@Component({
  selector: 'app-jira-config',
  templateUrl: './jira-config.component.html',
  styleUrls: [ './jira-config.component.css' ]
})
export class JiraConfigComponent implements OnInit {

  jiraConfig: JiraConfigDto;
  projectId: number;

  constructor(private router: Router,
              private projectsService: ProjectsService,
              private storeService: StoreService,
              private messageService: MessageService) {
    this.projectId = this.storeService.getCurrentProjectId();
    this.jiraConfig = {
      key: '',
      secret: '',
      url: ''
    };
  }

  ngOnInit() {
    this.projectsService.getJiraConfig(this.projectId)
      .subscribe(response => {
        this.jiraConfig = response;
      });
  }

  handleClick() {
    if (!this.jiraConfig.secret) {
      this.messageService.add({ severity: 'error', summary: 'Błąd', detail: 'Podaj kod!' });
      return;
    }

    this.projectsService.setJiraConfig(this.projectId, this.jiraConfig)
      .subscribe(response => {
          this.jiraConfig = response;
          this.router.navigateByUrl('/projects/jira-projects');
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Błąd', detail: 'Niepoprawny kod!' });
        });
  }
}
