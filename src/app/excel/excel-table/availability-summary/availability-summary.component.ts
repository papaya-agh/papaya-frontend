import { Component, Input, OnInit } from '@angular/core';
import { SprintDto } from '../../../declarations/models/sprint-dto';
import { SprintSummaryDto } from '../../../declarations/models/sprint-summary-dto';

@Component({
  selector: 'app-availability-summary',
  templateUrl: './availability-summary.component.html',
  styleUrls: ['./availability-summary.component.css']
})
export class AvailabilitySummaryComponent implements OnInit {

  @Input()
  currentSprint: SprintDto;

  @Input()
  sprintSummary: SprintSummaryDto;

  constructor() { }

  ngOnInit() {
  }

  private roundNumber(num: number): string {
    return (Math.round(num * 100) / 100).toString();
  }

  private formatNumber(num: number): string {
    return (Math.floor(num / 60) + Math.round((num % 60) / 60 * 100) / 100).toString();
  }
}
