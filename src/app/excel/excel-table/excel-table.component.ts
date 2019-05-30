import { Component, OnInit } from '@angular/core';
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
import { JiraSprintDto } from '../../declarations/models/jira-sprint-dto';
import { SprintSummaryDto } from '../../declarations/models/sprint-summary-dto';

@Component({
  selector: 'app-excel-table',
  templateUrl: './excel-table.component.html',
  styleUrls: [ './excel-table.component.css' ]
})
export class ExcelTableComponent implements OnInit {
  prevAverageSprintCoefficient: string;
  currentAverageSprintCoefficient: string;
  timeToAssign: string;
  totalDeclaredTime: string;
  totalNeededTime: string;
  
  workers: Worker[];
  sprintStartDate: string;
  sprintEndDate: string;
  availability: AvailabilityDto;
  declarableSprint: SprintDto;
  isLoaded: boolean;
  jiraSprints: JiraSprintDto[];
  isSynchronized: boolean;
  sprintSummary: SprintSummaryDto;

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
    this.isSynchronized = false;
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
            this.prevAverageSprintCoefficient = this.roundNumber(summary.prevAverageSprintCoefficient);
            this.currentAverageSprintCoefficient = this.roundNumber(summary.currentAverageSprintCoefficient);
            this.timeToAssign = this.formatNumber(summary.timeToAssign);
            this.totalDeclaredTime = this.formatNumber(summary.totalDeclaredTime);
            this.totalNeededTime = this.formatNumber(summary.totalNeededTime);

            this.projectService.getMembers(this.currentProject.id).subscribe(members => {
              summary.membersAvailability
                .map((a: UserAvailabilityDto) => {
                  const user = members.find((m: ProjectMemberDto) => m.user.id === a.userId);
                  const worker: Worker = a.availability ?
                    {
                      timeAvailable: this.formatNumber(a.availability.timeAvailable),
                      effectiveTimeAvailable: this.formatNumber(a.availability.effectiveTimeAvailable),
                      timeRemaining: this.formatNumber(a.availability.timeRemaining),
                      notes: a.availability.notes,
                      name: this.createFullName(user),
                    } :
                    { timeAvailable: '', effectiveTimeAvailable: '', timeRemaining: '', notes: '', name: this.createFullName(user) };

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

  synchronizeWithJira() {
    this.sprintsService.getJiraSprints(this.currentProject.id, this.declarableSprint)
      .subscribe(response => {
        this.jiraSprints = response;
        this.isSynchronized = true;
      });
  }

  chooseJiraSprint(jiraSprint: JiraSprintDto) {
    this.sprintsService.getSprintSummary(this.currentProject.id, this.declarableSprint.id, jiraSprint.id)
      .subscribe(response => {
        this.declarableSprint = response.sprint;
        setTimeout(() => this.router.navigateByUrl('/excel'));
        this.isSynchronized = false;
        this.messageService.add({ severity: 'success', summary: 'Sukces!', detail: 'Synchronizacja udana!' });
      });
  }

  private roundNumber(num: number): string {
    return (Math.round(num * 100) / 100).toString();
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
  effectiveTimeAvailable: string;
  timeRemaining: string;
  notes?: string;
}

