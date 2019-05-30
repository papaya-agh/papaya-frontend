import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from '../projects.service';
import { StoreService } from '../../p-common/store.service';
import { MessageService } from 'primeng/api';
import { JiraBoardDto } from '../../declarations/models/jira-board-dto';
import { ProjectDto } from '../../declarations/models/project-dto';

@Component({
  selector: 'app-jira-projects',
  templateUrl: './jira-projects.component.html',
  styleUrls: [ './jira-projects.component.css' ]
})
export class JiraProjectsComponent implements OnInit {

  jiraBoards: JiraBoardDto[];
  project: ProjectDto;

  constructor(private router: Router,
              private projectsService: ProjectsService,
              private storeService: StoreService,
              private messageService: MessageService) {
    this.project = this.storeService.getCurrentProject();
  }

  ngOnInit() {
    if (!this.project) {
      this.router.navigate([ '/projects' ]);
      return;
    }
    this.projectsService.getJiraProjects(this.project.id)
      .subscribe(response => {
        this.jiraBoards = response;
      });
  }

  handleClick(board) {
    this.projectsService.setJiraProject(this.project.id, board)
      .subscribe(() => {
        setTimeout(() => this.messageService.add({
          severity: 'success',
          summary: 'Sukces',
          detail: 'Konfiguracja pomyślna!'
        }));

        this.projectsService.getProject(this.project.id)
          .subscribe(project => {
            this.project = project;
            this.storeService.setCurrentProject(this.project);
            setTimeout(() => this.router.navigateByUrl('/overview'));
          });
      });
  }
}
