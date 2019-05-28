import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from '../projects.service';
import { ProjectDto } from '../../declarations/models/project-dto';
import { MessageService } from 'primeng/api';
import { StoreService } from '../../p-common/store.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: [ './new-project.component.css' ]
})
export class NewProjectComponent implements OnInit {

  project: ProjectDto;

  constructor(private router: Router,
              private projectsService: ProjectsService,
              private storeService: StoreService,
              private messageService: MessageService) {
    this.project = {
      id: undefined,
      name: '',
      description: '',
      initialCoefficient: 1.55,
      jiraUrl: '',
      webhookUrl: '',
      channelName: '',
      userRole: undefined
    };
  }

  ngOnInit() {
  }

  handleClick() {
    if (!this.project.name) {
      this.messageService.add({ severity: 'error', summary: 'Błąd', detail: 'Podaj nazwę projektu!' });
      return;
    }

    this.projectsService.addProject(this.project)
      .subscribe(response => {
        this.project = response;
        this.storeService.setCurrentProject(this.project);
        // https://papaya-test.atlassian.net
        this.router.navigateByUrl('/projects/jira-key');
      });
  }
}
