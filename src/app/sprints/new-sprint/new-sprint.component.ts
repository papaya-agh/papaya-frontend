import { Component, OnInit } from '@angular/core';
import { SprintDto } from '../../declarations/models/sprint-dto';
import { SprintsService } from '../sprints.service';
import { StoreService } from '../../p-common/store.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SprintStateDto } from '../../declarations/models/sprint-state-dto';
import { ProjectDto } from '../../declarations/models/project-dto';

@Component({
  selector: 'app-new-sprint-form',
  templateUrl: './new-sprint.component.html',
  styleUrls: [ './new-sprint.component.css' ]
})
export class NewSprintComponent implements OnInit {
  enrollmentPeriodStartDate: Date;
  enrollmentPeriodEndDate: Date;
  durationPeriodStartDate: Date;
  durationPeriodEndDate: Date;

  sprints: SprintDto[];
  newSprint: SprintDto;
  previousSprint: SprintDto;
  previousSprintDuration: number;
  currentProject: ProjectDto;
  sprintStateMap: Map<SprintStateDto, string>;

  constructor(private router: Router,
              private sprintsService: SprintsService,
              private storeService: StoreService,
              private messageService: MessageService) {
    this.newSprint = {
      enrollmentPeriod: { start: '', end: '' },
      durationPeriod: { start: '', end: '' },
    };
    this.currentProject = this.storeService.getCurrentProject();
    this.sprintStateMap = new Map<SprintStateDto, string>();
    this.sprintStateMap.set('UPCOMING', 'nadchodzący');
    this.sprintStateMap.set('DECLARABLE', 'zapisy');
    this.sprintStateMap.set('PADDING', 'planowanie');
    this.sprintStateMap.set('IN_PROGRESS', 'w trakcie');
    this.sprintStateMap.set('FINISHED', 'zakończony');
    this.sprintStateMap.set('CLOSED', 'zamknięty');
  }

  ngOnInit() {
    if (!this.currentProject) {
      this.router.navigate([ '/#/projects' ]);
      return;
    }

    this.sprintsService.getSprints(this.currentProject.id)
      .subscribe(response => {
          this.sprints = response;
          if (this.sprints.length !== 0) {
            this.previousSprint = this.sprints.reverse()[0];
            this.durationPeriodStartDate = new Date(this.previousSprint.durationPeriod.end);
            this.durationPeriodEndDate = new Date(this.previousSprint.durationPeriod.start);
            this.previousSprintDuration = this.durationPeriodStartDate.getTime() - this.durationPeriodEndDate.getTime();
            this.durationPeriodEndDate = new Date(this.durationPeriodStartDate.getTime() + this.previousSprintDuration);
            this.enrollmentPeriodEndDate = new Date(this.durationPeriodStartDate.getTime() - 24 * 60 * 60 * 1000);
            this.enrollmentPeriodStartDate = new Date(this.durationPeriodStartDate.getTime() - 3 * 24 * 60 * 60 * 1000);
          } else {
            this.enrollmentPeriodStartDate = new Date(new Date().getTime());
            this.enrollmentPeriodEndDate = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000);
            this.durationPeriodStartDate = new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000);
            this.durationPeriodEndDate = new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000);
          }
          this.sprints = this.sprints.reverse().filter(value => value.sprintState !== 'CLOSED').slice(0, 10);
        }
      );
  }

  formatDate(date: Date) {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
  }

  handleClick() {
    if (!this.enrollmentPeriodStartDate || !this.enrollmentPeriodEndDate ||
      !this.durationPeriodStartDate || !this.durationPeriodEndDate) {
      this.messageService.add({ severity: 'error', summary: 'Błąd', detail: 'Podaj wszystkie daty!' });
      return;
    } else {
      this.newSprint.enrollmentPeriod.start = this.formatDate(this.enrollmentPeriodStartDate);
      this.newSprint.enrollmentPeriod.end = this.formatDate(this.enrollmentPeriodEndDate);
      this.newSprint.durationPeriod.start = this.formatDate(this.durationPeriodStartDate);
      this.newSprint.durationPeriod.end = this.formatDate(this.durationPeriodEndDate);
    }

    this.sprintsService.addSprint(this.currentProject.id, this.newSprint)
      .subscribe(
        response => {
          this.newSprint = response;
          setTimeout(() => this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Sprint utworzony!' }));
          this.router.navigateByUrl('/#/overview');
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Błąd', detail: error.error.message });
        });
  }
}
