import { Component, OnInit } from '@angular/core';
import { AvailabilityService } from '../availability.service';
import { Location } from '@angular/common';
import { AvailabilityDto } from '../../declarations/models/availability-dto';
import { SprintDto } from '../../declarations/models/sprint-dto';
import { ProjectDto } from '../../declarations/models/project-dto';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { StoreService } from '../../p-common/store.service';
import { SprintsService } from '../../sprints/sprints.service';

@Component({
  selector: 'app-availability-table',
  templateUrl: './availability-table.component.html',
  styleUrls: [ './availability-table.component.css' ]
})
export class AvailabilityTableComponent implements OnInit {

  spinnersTime = {
    timeAvailableHours: 0,
    timeAvailableMinutes: 0,
    timeRemainingHours: 0,
    timeRemainingMinutes: 0,
  };

  availability: AvailabilityDto;

  declarableSprint: SprintDto;

  get currentProject(): ProjectDto {
    return this.store.currentProject;
  }

  constructor(
    private sprintsService: SprintsService,
    private availabilityService: AvailabilityService,
    private messageService: MessageService,
    private store: StoreService,
    private router: Router,
    private location: Location) {
  }

  ngOnInit() {
    if (!this.currentProject) {
      this.router.navigate([ 'projects' ]);
    } else {
      this.sprintsService.getSprints(this.currentProject.id, [ 'DECLARABLE' ]).subscribe(sprints => {
        if (sprints.length > 0) {
          this.declarableSprint = sprints[0];
          this.availabilityService.getUserAvailability(this.currentProject.id, this.declarableSprint.id)
            .subscribe(response => {
              this.availability = response;
              this.spinnersTime = {
                  timeAvailableHours: Math.floor(response.timeAvailable / 60),
                  timeAvailableMinutes: response.timeAvailable % 60,
                  timeRemainingHours: Math.floor(response.timeRemaining / 60),
                  timeRemainingMinutes: response.timeRemaining % 60,
              };
            });
        }
      });
    }
  }

  confirm() {
    this.availability.timeRemaining = this.spinnersTime.timeRemainingMinutes + this.spinnersTime.timeRemainingHours * 60;
    this.availability.timeAvailable = this.spinnersTime.timeAvailableMinutes + this.spinnersTime.timeAvailableHours * 60;
    this.availabilityService.updateUserAvailability(this.currentProject.id, this.declarableSprint.id, this.availability)
      .subscribe(response => {
        this.availability = response;
        this.messageService.add({ severity: 'success', summary: 'Zapisano', detail: 'Twoja dostępność została poprawnie zapisana' });
      });
  }

  goBack() {
    this.location.back();
  }
}
