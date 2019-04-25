import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-sprint-form',
  templateUrl: './new-sprint.component.html',
  styleUrls: [ './new-sprint.component.css' ]
})
export class NewSprintComponent implements OnInit {
  openDate: any;
  closeDate: any;
  enrollStartDate: any;
  enrollEndDate: any;

  constructor() {
  }

  ngOnInit() {
  }

  handleClick() {
  }
}
