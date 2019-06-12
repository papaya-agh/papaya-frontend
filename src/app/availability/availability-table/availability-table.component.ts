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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-availability-table',
  templateUrl: './availability-table.component.html',
  styleUrls: [ './availability-table.component.css' ]
})
export class AvailabilityTableComponent implements OnInit {

  timeRegexp: RegExp = /^ *((([0-9]+)h) *(([0-5]?[0-9])m)? *|(([0-5]?[0-9])m)) *$/;

  availabilityForm: FormGroup;

  submitted = false;

  availability: AvailabilityDto;

  declarableSprint: SprintDto;

  dataLoaded = false;

  get currentProject(): ProjectDto {
    return this.store.currentProject;
  }

  get f() {
    return this.availabilityForm.controls;
  }

  constructor(
    private sprintsService: SprintsService,
    private availabilityService: AvailabilityService,
    private messageService: MessageService,
    private store: StoreService,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder) {
  }


  ngOnInit() {
    if (!this.currentProject) {
      this.router.navigate([ 'projects' ]);
    } else {
      this.createForm();
      this.sprintsService.getSprints(this.currentProject.id, {
        sprintStates: [ 'DECLARABLE' ],
        direction: 'ASC',
        limit: 1
      }).subscribe(sprints => {
        if (sprints.length > 0) {
          this.declarableSprint = sprints[0];
          this.availabilityService.getUserAvailability(this.currentProject.id, this.declarableSprint.id)
            .subscribe(response => {
              this.dataLoaded = true;
              this.availability = response;
              this.setFormFields(response);
            });
        } else {
          this.dataLoaded = true;
        }
      });
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.availabilityForm.invalid) {
      return;
    }

    this.availability = this.createAvailabilityFromForm();
    this.availabilityService.updateUserAvailability(this.currentProject.id, this.declarableSprint.id, this.availability)
      .subscribe(response => {
          this.availability = response;
          setTimeout(() => this.messageService.add({
            severity: 'success',
            summary: 'Zapisano',
            detail: 'Twoja dostępność została poprawnie zapisana'
          }));
          this.router.navigateByUrl('/overview');
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Błąd', detail: error.error.message });
        });
  }

  setFormFields(availability: AvailabilityDto): void {
    this.f.timeAvailable.setValue(this.formatTime(availability.timeAvailable));
    this.f.timeRemaining.setValue(this.formatTime(availability.timeRemaining));
    this.f.notes.setValue(availability.notes);
  }

  createAvailabilityFromForm() {
    return {
      timeAvailable: this.convertToMinutes(this.f.timeAvailable.value),
      timeRemaining: this.convertToMinutes(this.f.timeRemaining.value),
      notes: this.f.notes.value,
    };
  }

  createForm(): void {
    this.availabilityForm = this.formBuilder.group({
      timeAvailable: [ '', Validators.required ],
      timeRemaining: [ '', Validators.required ],
      notes: [ '' ],
    });
  }

  formatTime(minutes: number): string {
    const timeAvailableHours = Math.floor(minutes / 60);
    const timeAvailableMinutes = minutes % 60;
    return timeAvailableHours + 'h ' + timeAvailableMinutes + 'm';
  }

  convertToMinutes(time: string): number {
    const groups = time.match(this.timeRegexp);
    let hours = 0;
    let minutes = 0;
    if (groups[3]) {
      hours = +groups[3];
      minutes = groups[5] ? +groups[5] : 0;
    } else if (groups[7]) {
      minutes = +groups[7];
    }

    return hours * 60 + minutes;
  }

  goBack() {
    this.location.back();
  }
}
