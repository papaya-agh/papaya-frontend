import { Component, OnInit } from '@angular/core';
import { ExcelService } from '../excel.service';
import { SprintsService } from '../../sprints/sprints.service';
import { ProjectsService } from '../../projects/projects.service';
import { StoreService } from '../../p-common/store.service';
import { SprintDto } from '../../declarations/models/sprint-dto';
import { ProjectDto } from '../../declarations/models/project-dto';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { JiraSprintDto } from '../../declarations/models/jira-sprint-dto';
import { SprintSummaryDto } from '../../declarations/models/sprint-summary-dto';
import { concatMap, filter, map, skipWhile, take, tap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { SprintStateDto } from '../../declarations/models/sprint-state-dto';

@Component({
  selector: 'app-excel-table',
  templateUrl: './excel-table.component.html',
  styleUrls: [ './excel-table.component.css' ]
})
export class ExcelTableComponent implements OnInit {
  get currentSprint(): SprintDto {
    return this._currentSprint;
  }

  set currentSprint(value: SprintDto) {
    this._currentSprint = value;
    this.getCurrentSprintSummary();
  }

  // tslint:disable-next-line:variable-name
  private _currentSprint: SprintDto;


  observables: Observable<SprintDto>[];

  isPreviousAvailable = false;
  isNextAvailable = false;
  isLoaded = false;
  isSynchronized = false;
  jiraSprints: JiraSprintDto[];
  sprintSummary: SprintSummaryDto;

  projectMembersById = {};

  sprintStateMap = {
    DECLARABLE: 'Trwa podawanie dostępności',
    FINISHED: 'Sprint zakończony',
    IN_PROGRESS: 'Sprint rozpoczęty',
    CLOSED: 'Sprint zamknięty',
    PADDING: 'Oczekuje na rozpoczęcie',
    UPCOMING: 'Nadchodzący'
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

  selectSprintIfAvailable(obs: Observable<SprintDto>) {
    obs.pipe(
      tap(() => this.isLoaded = true),
      filter(sprint => !!sprint),
      tap(sprint => this.currentSprint = sprint)
    ).subscribe(_ => {
    }, error => {
      if (error.status !== 404) {
        throw error;
      }
    });
  }

  ngOnInit() {
    if (!this.currentProject) {
      this.router.navigate([ 'projects' ]);
      return;
    }

    this.observables = [
      this.getFirstSprintWithState([ 'IN_PROGRESS' ], 'ASC'),
      this.getFirstSprintWithState([ 'DECLARABLE', 'PADDING', 'FINISHED', 'UPCOMING' ], 'ASC'),
      this.getFirstSprintWithState([ 'CLOSED' ], 'DESC'),
    ];

    this.selectSprintIfAvailable(this.getFirstSprint());
  }

  onNextClick() {
    this.selectSprintIfAvailable(this.getNextSprint());
  }

  onPrevClick() {
    this.selectSprintIfAvailable(this.getPreviousSprint());
  }

  getFirstSprint() {
    return from(this.observables)
      .pipe(
        concatMap(_ => _),
        skipWhile(_ => !_),
        take(1)
      );
  }

  private getFirstSprintWithState(states: SprintStateDto[], direction: 'ASC' | 'DESC'): Observable<SprintDto> {
    return this.sprintsService.getSprints(this.currentProject.id,
      {
        direction,
        limit: 1,
        sprintStates: states,
      }).pipe(
      map(val => val.length > 0 ? val[0] : null)
    );
  }

  getPreviousSprint() {
    return this.sprintsService.getPreviousSprint(this.currentProject.id, this.currentSprint.id);
  }

  getNextSprint() {
    return this.sprintsService.getFollowingSprint(this.currentProject.id, this.currentSprint.id);
  }

  closeSprint() {
    this.currentSprint.sprintState = 'CLOSED';

    this.sprintsService.updateSprint(this.currentProject.id, this.currentSprint)
      .subscribe(sprint => {
        this.currentSprint = sprint;
        this.messageService.add({ severity: 'success', summary: 'Sukces!', detail: 'Sprint został zamknięty' });
      });
  }

  getCurrentSprintSummary() {
    this.projectService.getMembers(this.currentProject.id).subscribe(members => {
      members.forEach(member => this.projectMembersById[member.user.id] = member);

      this.excelService.getSprintSummary(this.currentProject.id, this.currentSprint.id)
        .subscribe(summary => {
          this.sprintSummary = summary;
        });
    });
  }

  synchronizeWithJira() {
    this.sprintsService.getJiraSprints(this.currentProject.id, this.currentSprint)
      .subscribe(response => {
        this.jiraSprints = response;
        this.isSynchronized = true;
      });
  }

  chooseJiraSprint(jiraSprint: JiraSprintDto) {
    this.sprintsService.getSprintSummary(this.currentProject.id, this.currentSprint.id, jiraSprint.id)
      .subscribe(response => {
        this._currentSprint = response.sprint;
        // this.setUpDataForSprintOfInd();
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
}


