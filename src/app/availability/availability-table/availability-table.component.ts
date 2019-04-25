﻿import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-availability-table',
  templateUrl: './availability-table.component.html',
  styleUrls: ['./availability-table.component.css']
})
export class AvailabilityTableComponent implements OnInit {
  
  constructor(private location: Location) {}
  
  ngOnInit() {
  }

  sprint = 3;
  startDate = "10/11/2012";
  endDate = "13/11/2013";

  comment: string;
  remainingTime: string;
  declaredTime: string;

  confirm() {
  }

  goBack() {
    this.location.back();
  }
}
