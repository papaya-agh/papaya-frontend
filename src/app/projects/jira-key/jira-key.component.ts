import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from '../projects.service';
import { MessageService } from 'primeng/api';
import { JiraConfigDto } from '../../declarations/models/jira-config-dto';

@Component({
  selector: 'app-jira-key',
  templateUrl: './jira-key.component.html',
  styleUrls: ['./jira-key.component.css']
})
export class JiraKeyComponent implements OnInit {

  jiraConfig: JiraConfigDto;

  constructor(private router: Router,
              private projectsService: ProjectsService,
              private messageService: MessageService) {
    this.jiraConfig = {
      key: '',
      secret: '',
      url: ''
    };
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

    this.router.navigateByUrl('/projects/jira-config');
  }
}
