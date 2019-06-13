import { Component, OnInit } from '@angular/core';
import { SprintDto } from '../../declarations/models/sprint-dto';
import { SprintsService } from '../sprints.service';
import { StoreService } from '../../p-common/store.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProjectDto } from '../../declarations/models/project-dto';
import { max } from 'rxjs/operators';

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

  newSprint: SprintDto;
  previousSprint: SprintDto;
  previousSprintDuration: number;
  previousSprintEnrollment: number;
  currentProject: ProjectDto;

  constructor(private router: Router,
              private sprintsService: SprintsService,
              private storeService: StoreService,
              private messageService: MessageService) {
    this.newSprint = {
      enrollmentPeriod: { start: '', end: '' },
      durationPeriod: { start: '', end: '' },
    };
    this.currentProject = this.storeService.getCurrentProject();
  }

  ngOnInit() {
    if (!this.currentProject) {
      this.router.navigate([ '/projects' ]);
      return;
    }

    this.sprintsService.getSprints(this.currentProject.id, { limit: 1, direction: 'DESC' })
      .subscribe(response => {
          this.previousSprint = response[0];
          if (this.previousSprint) {
            this.previousSprintDuration = new Date(this.previousSprint.durationPeriod.end).getTime()
              - new Date(this.previousSprint.durationPeriod.start).getTime();
            this.previousSprintEnrollment = new Date(this.previousSprint.enrollmentPeriod.end).getTime()
              - new Date(this.previousSprint.enrollmentPeriod.start).getTime();

            if (new Date(this.previousSprint.durationPeriod.end) < new Date()) {
              this.enrollmentPeriodStartDate = new Date(new Date().getTime());
            } else {
              this.enrollmentPeriodStartDate = new Date(new Date(this.previousSprint.durationPeriod.end).getTime());
            }
            this.enrollmentPeriodEndDate = new Date(this.enrollmentPeriodStartDate.getTime() + this.previousSprintEnrollment);
            this.durationPeriodStartDate = new Date(this.enrollmentPeriodEndDate.getTime() + 1000);
            this.durationPeriodEndDate = new Date(this.durationPeriodStartDate.getTime() + this.previousSprintDuration);
          } else {
            this.enrollmentPeriodStartDate = new Date(new Date().getTime());
            this.enrollmentPeriodEndDate = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000);
            this.durationPeriodStartDate = new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000);
            this.durationPeriodEndDate = new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000);
          }
        }
      );
  }

  formatDate(date: Date) {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
  }

  createSprint() {
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
          this.router.navigateByUrl('/overview');
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Błąd', detail: error.error.message });
        });
  }
}
