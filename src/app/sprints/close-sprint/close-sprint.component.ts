import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-close-sprint',
  templateUrl: './close-sprint.component.html',
  styleUrls: ['./close-sprint.component.css']
})
export class CloseSprintComponent implements OnInit {

  plannedHours: number;
  burnedHours: number;

  constructor() { }

  ngOnInit() {
  }

  handleClick() {
  }

}
