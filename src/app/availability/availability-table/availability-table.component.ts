import { Component, OnInit } from '@angular/core';
import { AvailabilityService } from '../availability.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-availability-table',
  templateUrl: './availability-table.component.html',
  styleUrls: [ './availability-table.component.css' ]
})
export class AvailabilityTableComponent implements OnInit {

  sprint: object;

  comment: string;
  remainingHours: number;
  declaredHours: number;

  constructor(
    private availabilityService: AvailabilityService,
    private location: Location) {
  }

  ngOnInit() {
    this.availabilityService.getAvailability().subscribe(response => this.sprint = response);
  }
  
  confirm() {
    let comment = this.comment;
    let remainingTime = this.remainingHours;
    let declaredTime = this.declaredHours;

    let obj = { comment, remainingTime, declaredTime };
    this.availabilityService.addAvailability(obj);
  }

  goBack() {
    this.location.back();
  }
}
