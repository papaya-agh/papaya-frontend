import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SprintsService } from '../sprints.service';
import { StoreService } from '../../p-common/store.service';
import { MessageService } from 'primeng/api';
import { SprintDto } from '../../declarations/models/sprint-dto';
import { ProjectDto } from '../../declarations/models/project-dto';
import { Resources } from '../../p-common/resources';

@Component({
  selector: 'app-sprints-table',
  templateUrl: './sprints-table.component.html',
  styleUrls: [ './sprints-table.component.css' ]
})
export class SprintsTableComponent implements OnInit {
  sprints: SprintDto[];
  currentProject: ProjectDto;
  sprintStateMap = Resources.SPRINT_STATE_MAP;

  constructor(private router: Router,
              private sprintsService: SprintsService,
              private storeService: StoreService,
              private messageService: MessageService) {
    this.currentProject = this.storeService.getCurrentProject();
  }

  ngOnInit() {
    if (!this.currentProject) {
      this.router.navigate([ '/projects' ]);
      return;
    }

    this.sprintsService.getSprints(this.currentProject.id)
      .subscribe(response => {
          this.sprints = response;
          this.sprints = this.sprints.reverse();
        }
      );
  }

  deleteSprint(sprint) {
    this.sprintsService.deleteSprint(this.currentProject.id, sprint)
      .subscribe(
        _ => {
          setTimeout(() => this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Sprint usunięty!' }));
          this.router.navigateByUrl('/overview');
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Błąd', detail: error.error.message });
        });
  }
}
