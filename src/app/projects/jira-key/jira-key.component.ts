import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from '../projects.service';
import { MessageService } from 'primeng/api';
import { JiraConfigDto } from '../../declarations/models/jira-config-dto';
import { ProjectDto } from '../../declarations/models/project-dto';
import { StoreService } from '../../p-common/store.service';

@Component({
  selector: 'app-jira-key',
  templateUrl: './jira-key.component.html',
  styleUrls: [ './jira-key.component.css' ]
})
export class JiraKeyComponent implements OnInit {

  jiraConfig: JiraConfigDto;
  currentProject: ProjectDto;

  @ViewChild('jiraKeyTextArea')
  jiraKeyTextArea: ElementRef;

  constructor(private router: Router,
              private projectsService: ProjectsService,
              private storeService: StoreService,
              private messageService: MessageService) {
    this.jiraConfig = {
      key: '',
      secret: '',
      url: ''
    };
    this.currentProject = this.storeService.getCurrentProject();
  }

  ngOnInit() {
    if (!this.currentProject) {
      this.router.navigate([ '/projects' ]);
      return;
    }
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

    this.projectsService.getJiraConfig(this.currentProject.id)
      .subscribe(response => {
          this.jiraConfig = response;
          this.router.navigateByUrl('/projects/jira-config');
        },
        () => {
          this.messageService.add({ severity: 'error', summary: 'Błąd', detail: 'Klucz nie został skonfigurowany!' });
        });
  }

  copyJiraKeyToClipboard() {
    this.jiraKeyTextArea.nativeElement.select();
    document.execCommand('copy');
    this.jiraKeyTextArea.nativeElement.setSelectionRange(0, 0);
    this.messageService.add({ severity: 'success', summary: 'Skopiowano do schowka' });
  }

}
