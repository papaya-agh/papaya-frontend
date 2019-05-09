import { Component, OnInit } from '@angular/core';
import { SprintDto } from '../../declarations/models/sprint-dto';
import { Router } from '@angular/router';
import { SprintsService } from '../sprints.service';
import { StoreService } from '../../p-common/store.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-close-sprint',
  templateUrl: './close-sprint.component.html',
  styleUrls: [ './close-sprint.component.css' ]
})
export class CloseSprintComponent implements OnInit {

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
      sprintState: undefined
    };
    this.projectId = this.storeService.getCurrentProjectId();
  }

  ngOnInit() {
    this.sprintsService.getSprints(this.projectId)
      .subscribe(response => this.sprint = response[0]);
  }

  handleClick() {
    if (!this.sprint.timePlanned || !this.sprint.timeBurned) {
      this.messageService.add({ severity: 'error', summary: 'Błąd', detail: 'Podaj wszystkie liczby!' });
      return;
    } else {
      this.sprint.sprintState = 'CLOSED';
    }

    this.sprintsService.modifySprint(this.projectId, this.sprint)
      .subscribe(
        response => {
          this.sprint = response;
          setTimeout(() => this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Sprint zamknięty!' }));
          this.router.navigateByUrl('/example');
        });
  }

}
