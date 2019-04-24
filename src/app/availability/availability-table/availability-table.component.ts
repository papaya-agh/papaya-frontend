import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-availability-table',
  templateUrl: './availability-table.component.html',
  styleUrls: ['./availability-table.component.css']
})
export class AvailabilityTableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  actualRate = 2;
  hoursSum = 123;

}
