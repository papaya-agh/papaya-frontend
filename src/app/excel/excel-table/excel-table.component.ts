﻿import { Component, OnInit } from '@angular/core';
import { ExcelService } from '../excel.service';
import { SprintsService } from '../../sprints/sprints.service';
import { ProjectsService } from '../../projects/projects.service';
import { StoreService } from '../../p-common/store.service';
import { AvailabilityDto } from '../../declarations/models/availability-dto';
import { UserAvailabilityDto } from '../../declarations/models/user-availability-dto';
import { SprintDto } from '../../declarations/models/sprint-dto';
import { ProjectDto } from '../../declarations/models/project-dto';
import { Router } from '@angular/router';
import { ProjectMemberDto } from '../../declarations/models/project-member-dto';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-excel-table',
  templateUrl: './excel-table.component.html',
  styleUrls: [ './excel-table.component.css' ]
})
export class ExcelTableComponent implements OnInit {

  actualRate: number;
  hoursSum = 0;
  workers: Worker[];
  sprintStartDate: string;
  sprintEndDate: string;
  availability: AvailabilityDto;
  declarableSprint: SprintDto;
  isLoaded: boolean;

  sprintStateMap = {
    DECLARABLE: 'Trwa podawanie dostępności',
    FINISHED: 'Sprint zakończony',
    IN_PROGRESS: 'Sprint rozpoczęty',
    CLOSED: 'Sprint zamknięty',
    PADDING: 'Oczekuje na rozpoczęcie',
  };

  get currentProject(): ProjectDto {
    return this.store.currentProject;
  }

  constructor(
    private sprintsService: SprintsService,
    private excelService: ExcelService,
    private projectService: ProjectsService,
    private store: StoreService,
    private messageService: MessageService,
    private router: Router) {
  }

  ngOnInit() {
    this.workers = [];
    this.isLoaded = false;
    if (!this.currentProject) {
      this.router.navigate([ 'projects' ]);
      return;
    }
    this.sprintsService.getSprints(this.currentProject.id, [ 'DECLARABLE', 'PADDING', 'IN_PROGRESS', 'FINISHED' ])
      .subscribe(sprints => {
        this.isLoaded = true;
        if (sprints.length === 0) {
          return;
        }
        this.declarableSprint = sprints[0];
        this.sprintStartDate = this.declarableSprint.durationPeriod.start;
        this.sprintEndDate = this.declarableSprint.durationPeriod.end;

        this.excelService.getSprintSummary(this.currentProject.id, this.declarableSprint.id)
          .subscribe(summary => {
            this.hoursSum = Math.floor(summary.totalDeclaredTime / 60) + Math.round((summary.totalDeclaredTime % 60) / 60 * 100) / 100;
            this.actualRate = summary.prevAverageSprintCoefficient;

            this.projectService.getMembers(this.currentProject.id).subscribe(members => {
              summary.membersAvailability
                .map((a: UserAvailabilityDto) => {
                  const user = members.find((m: ProjectMemberDto) => m.user.id === a.userId);
                  const worker: Worker = a.availability ?
                    {
                      timeAvailable: this.formatNumber(a.availability.timeAvailable),
                      timeRemaining: this.formatNumber(a.availability.timeRemaining),
                      notes: a.availability.notes,
                      name: this.createFullName(user),
                    } :
                    { timeAvailable: '', timeRemaining: '', notes: '', name: this.createFullName(user) };

                  this.workers.push(worker);
                });
            });
          });
      });
  }

  closeSprint() {
    this.declarableSprint.timeBurned = 18;
    this.declarableSprint.finalTimePlanned = 102;
    this.declarableSprint.sprintState = 'CLOSED';

    this.sprintsService.updateSprint(this.currentProject.id, this.declarableSprint)
      .subscribe(sprint => {
        this.declarableSprint = sprint;
        this.messageService.add({ severity: 'success', summary: 'Sukces!', detail: 'Sprint został zamknięty' });
      });
  }

  private formatNumber(num: number): string {
    return (Math.floor(num / 60) + Math.round((num % 60) / 60 * 100) / 100).toString();
  }

  private createFullName(user: ProjectMemberDto): string {
    return user.user.firstName + ' ' + user.user.lastName;
  }
}

interface Worker {
  name: string;
  timeAvailable: string;
  timeRemaining: string;
  notes?: string;
}
