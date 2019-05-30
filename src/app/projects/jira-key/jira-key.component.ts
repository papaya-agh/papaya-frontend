import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from '../projects.service';
import { MessageService } from 'primeng/api';
import { JiraConfigDto } from '../../declarations/models/jira-config-dto';
import { ProjectDto } from '../../declarations/models/project-dto';
import { StoreService } from '../../p-common/store.service';

@Component({
  selector: 'app-jira-key',
  templateUrl: './jira-key.component.html',
  styleUrls: ['./jira-key.component.css']
})
export class JiraKeyComponent implements OnInit {

  jiraConfig: JiraConfigDto;
  projectId: number;

  constructor(private router: Router,
              private projectsService: ProjectsService,
              private storeService: StoreService,
              private messageService: MessageService) {
    this.jiraConfig = {
      key: '',
      secret: '',
      url: ''
    };
    this.projectId = this.storeService.getCurrentProjectId();
  }

  ngOnInit() {
    this.projectsService.getJiraKey()
      .subscribe(response => {
        this.jiraConfig = response;
      });
  }

  handleClick() {
    if (!this.jiraConfig.key) {
      this.messageService.add({ severity: 'error', summary: 'Błąd', detail: 'Niepoprawny klucz publiczny!' });
      return;
    }

    this.projectsService.getJiraConfig(this.projectId)
      .subscribe(response => {
          this.jiraConfig = response;
          this.router.navigateByUrl('/projects/jira-config');
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Błąd', detail: 'Klucz nie został skonfigurowany!' });
        });
  }
}
