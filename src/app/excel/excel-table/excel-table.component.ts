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
import { catchError, concatMap, filter, flatMap, map, skipWhile, take, tap } from 'rxjs/operators';
import { from, Observable, of, zip } from 'rxjs';
import { SprintStateDto } from '../../declarations/models/sprint-state-dto';
import { Resources } from '../../p-common/resources';

@Component({
  selector: 'app-excel-table',
  templateUrl: './excel-table.component.html',
  styleUrls: [ './excel-table.component.css' ]
})
export class ExcelTableComponent implements OnInit {

  currentSprint: SprintDto;

  sprintStateMap = Resources.SPRINT_STATE_MAP;

  isSprintLoaded = false;

  isLoading = true;

  showSprintSelectMenu = false;

  jiraSprints: JiraSprintDto[];

  sprintSummary: SprintSummaryDto;

  sprintNavigationStatus: SprintNavigationStatus = { prevAvailable: false, nextAvailable: false };

  projectMembersById = {};

  static mapToSprintNavigationStatus(sprints: SprintDto[]): SprintNavigationStatus {
    return { prevAvailable: !!sprints[0], nextAvailable: !!sprints[1] };
  }

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
    if (!this.currentProject) {
      this.router.navigate([ 'projects' ]);
      return;
    }
    this.selectSprintIfAvailable(this.getFirstSprint());
  }

  selectSprintIfAvailable(source: Observable<SprintDto>) {
    this.isLoading = true;
    source.pipe(
      tap(() => this.isSprintLoaded = true),
      filter(sprint => !!sprint),
      tap(sprint => this.currentSprint = sprint),
      flatMap(() => this.getNextAndPrevAvailability()),
      tap(status => this.sprintNavigationStatus = status),
      flatMap(() => this.getCurrentSprintSummary()),
      tap(summary => this.sprintSummary = summary),
      tap(() => this.isLoading = false),
    ).subscribe();
  }

  getNextAndPrevAvailability(): Observable<SprintNavigationStatus> {
    return zip(this.getPreviousSprint(), this.getNextSprint()).pipe(
      map(ExcelTableComponent.mapToSprintNavigationStatus),
    );
  }

  getPreviousSprint() {
    return this.sprintsService.getPreviousSprint(this.currentProject.id, this.currentSprint.id).pipe(
      catchError(() => of(null))
    );
  }

  getNextSprint() {
    return this.sprintsService.getFollowingSprint(this.currentProject.id, this.currentSprint.id).pipe(
      catchError(() => of(null))
    );
  }

  getFirstSprint() {
    return from([
      this.getFirstSprintWithState([ 'IN_PROGRESS' ], 'ASC'),
      this.getFirstSprintWithState([ 'DECLARABLE', 'PADDING', 'FINISHED', 'UPCOMING' ], 'ASC'),
      this.getFirstSprintWithState([ 'CLOSED' ], 'DESC'),
      of(undefined),
    ]).pipe(
      concatMap(_ => _),
      skipWhile(res => res === null),
      take(1)
    );
  }

  getFirstSprintWithState(states: SprintStateDto[], direction: 'ASC' | 'DESC'): Observable<SprintDto> {
    return this.sprintsService.getSprints(this.currentProject.id,
      {
        direction,
        limit: 1,
        sprintStates: states,
      }).pipe(
      map(val => val.length > 0 ? val[0] : null)
    );
  }

  closeSprint() {
    if (this.currentSprint.timeBurned === null) {
      this.showMessage('Info', 'Zalecana jest synchronizacja z Jirą!', 'info');
      return;
    }
    this.currentSprint.sprintState = 'CLOSED';
    const updateSprint$ = this.sprintsService.updateSprint(this.currentProject.id, this.currentSprint).pipe(
      tap(() => this.showMessage('Sukces!', 'Sprint został zamknięty'))
    );

    this.selectSprintIfAvailable(updateSprint$);
  }

  getCurrentSprintSummary() {
    return this.projectService.getMembers(this.currentProject.id).pipe(
      tap(members => members.forEach(member => this.projectMembersById[member.user.id] = member)),
      flatMap(() => this.excelService.getSprintSummary(this.currentProject.id, this.currentSprint.id)),
    );
  }

  synchronizeWithJira() {
    this.sprintsService.getJiraSprints(this.currentProject.id, this.currentSprint)
      .subscribe(response => {
        this.jiraSprints = response;
        this.showSprintSelectMenu = true;
      });
  }

  chooseJiraSprint(jiraSprint: JiraSprintDto) {
    const chooseSprint$ = this.sprintsService.getSprintSummary(this.currentProject.id, this.currentSprint.id, jiraSprint.id).pipe(
      map(response => response.sprint),
      tap(() => this.showSprintSelectMenu = false),
      tap(() => this.showMessage('Sukces!', 'Synchronizacja udana!'))
    );
    this.selectSprintIfAvailable(chooseSprint$);
  }

  onNextClick() {
    this.selectSprintIfAvailable(this.getNextSprint());
  }

  onPrevClick() {
    this.selectSprintIfAvailable(this.getPreviousSprint());
  }

  showMessage(summary: string, detail: string, messageSeverity?: string) {
    const severity = messageSeverity ? messageSeverity : 'success';
    this.messageService.add({ severity, summary, detail });
  }
}

interface SprintNavigationStatus {
  prevAvailable: boolean;
  nextAvailable: boolean;
}
