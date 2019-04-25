import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ExcelService } from '../excel.service';
import { Worker } from '../worker';
import { SprintsService } from '../../sprints/sprints.service';
import { ProjectsService } from '../../projects/projects.service';
import { StoreService } from '../../p-common/store.service';
import { AvailabilityDto } from '../../declarations/models/availability-dto';
import { UserAvailabilityDto } from '../../declarations/models/user-availability-dto';
import { SprintDto } from '../../declarations/models/sprint-dto';
import { ProjectDto } from '../../declarations/models/project-dto';
import { Router } from '@angular/router';
import { ProjectMemberDto } from '../../declarations/models/project-member-dto';

@Component({
  selector: 'app-excel-table',
  templateUrl: './excel-table.component.html',
  styleUrls: ['./excel-table.component.css']
})
export class ExcelTableComponent implements OnInit {

  actualRate: number;
  hoursSum = 0;
  workers: Worker[];
  canClose: boolean;
  inProgress: boolean;
  sprintStartDate: string;
  sprintEndDate: string;
  availability: AvailabilityDto;
  declarableSprint: SprintDto;
  sprintId: number;
  contentExists: boolean;

  get currentProject(): ProjectDto {
    return this.store.currentProject;
  }

  constructor(
    private sprintsService: SprintsService,
    private excelService: ExcelService,
    private projectService: ProjectsService,
    private store: StoreService,
    private router: Router,
    private location: Location) {
  }

  ngOnInit() {
    this.workers = [];
    this.contentExists = false;
    if (!this.currentProject) {
      this.router.navigate(['projects']);
    } else {
      this.sprintsService.getSprints(this.currentProject.id).subscribe(sprints => {

        if (sprints.length > 0) {
          this.contentExists = true;
          this.declarableSprint = sprints[0];
          this.sprintId = this.declarableSprint.id;
          this.canClose = this.declarableSprint.sprintState.toUpperCase() === 'FINISHED';
          this.inProgress = this.declarableSprint.sprintState.toUpperCase() === 'DECLARABLE';
          this.sprintStartDate = this.declarableSprint.durationPeriod.start;
          this.sprintEndDate = this.declarableSprint.durationPeriod.end;
          this.excelService.getSprintSummary(this.currentProject.id, this.declarableSprint.id)
            .subscribe(summary => {
              this.hoursSum = summary.totalAvailableTime;
              this.actualRate = summary.sprintCoefficient;
              let no = 1;
              this.projectService.getUsersFromProject(this.currentProject.id).subscribe(members => {
                summary.membersAvailability
                  .map((a: UserAvailabilityDto) => {
                    const user = members.find((m: ProjectMemberDto) => m.user.id === a.userId);
                    const userName = user.user.firstName + ' ' + user.user.lastName;
                    let timeAvailable = -1;
                    let timeRemaining = -1;
                    let notes = '';
                    if (a.availability != null) {
                      timeAvailable = a.availability.timeAvailable / 60;
                      timeRemaining = a.availability.timeRemaining / 60;
                      notes = a.availability.notes;
                    }
                    const worker: Worker = {
                      id: no,
                      timeAvailable: timeAvailable.toFixed().toString(),
                      timeRemaining: timeRemaining.toFixed().toString(),
                      notes: `${notes}`,
                      name: userName
                    };
                    if (worker.timeAvailable == null || worker.timeAvailable === '-1') {
                      worker.timeAvailable = '';
                    }
                    if (worker.timeRemaining == null || worker.timeRemaining === '-1') {
                      worker.timeRemaining = '';
                    }
                    no++;
                    this.workers.push(worker);
                  });
              });
            });
        }
      });
    }
  }

  closeSprint() {
    this.declarableSprint.timeBurned = 18;
    this.declarableSprint.timePlanned = 102;
    this.declarableSprint.sprintState = 'CLOSED';
    this.sprintsService.updateSprint(this.currentProject.id, this.declarableSprint)
      .subscribe(sprint => this.declarableSprint = sprint);
  }
}
