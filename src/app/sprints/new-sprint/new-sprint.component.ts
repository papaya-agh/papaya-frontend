import { Component, OnInit } from '@angular/core';
import { SprintDto } from '../../declarations/models/sprint-dto';
import { SprintsService } from '../sprints.service';
import { StoreService } from '../../p-common/store.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

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
  sprint: SprintDto;
  projectId: number;

  constructor(private router: Router,
              private sprintsService: SprintsService,
              private storeService: StoreService,
              private messageService: MessageService) {
    this.sprint = {
      id: undefined,
      enrollmentPeriod: { start: '', end: '' },
      durationPeriod: { start: '', end: '' },
      dateClosed: '',
      timeBurned: undefined,
      timePlanned: undefined,
      sprintState: 'UPCOMING'
    };
    this.projectId = this.storeService.getCurrentProjectId();
  }

  ngOnInit() {
    this.sprintsService.getSprints(this.projectId)
      .subscribe(response => this.sprints = response);
  }

  formatDate(date: Date) {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
  }

  handleClick() {
    if (!this.enrollmentPeriodStartDate || !this.enrollmentPeriodEndDate ||
      !this.durationPeriodStartDate || !this.durationPeriodEndDate) {
      this.messageService.add({ severity: 'error', summary: 'Błąd', detail: 'Podaj wszystkie daty!' });
      return;
    } else if (!this.sprint.timePlanned) {
      this.messageService.add({ severity: 'error', summary: 'Błąd', detail: 'Podaj liczbę godzin!' });
      return;
    } else {
      this.sprint.enrollmentPeriod.start = this.formatDate(this.enrollmentPeriodStartDate);
      this.sprint.enrollmentPeriod.end = this.formatDate(this.enrollmentPeriodEndDate);
      this.sprint.durationPeriod.start = this.formatDate(this.durationPeriodStartDate);
      this.sprint.durationPeriod.end = this.formatDate(this.durationPeriodEndDate);
    }

    this.sprintsService.addSprint(this.projectId, this.sprint)
      .subscribe(
        response => {
          this.sprint = response;
          setTimeout(() => this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Sprint utworzony!' }));
          this.router.navigateByUrl('/overview');
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Błąd', detail: error.error.message });
        });
  }
}
