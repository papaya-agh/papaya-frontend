import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-availability-table',
  templateUrl: './availability-table.component.html',
  styleUrls: ['./availability-table.component.css']
})
export class AvailabilityTableComponent implements OnInit {
  
  constructor() {}
  
  ngOnInit() {
  }
  
  actualRate = 2;
  hoursSum = 123;
  workers = [
    { id: 1, name: "Robert Kubica", declaredHours: 3 },
    { id: 2, name: "Adam Małysz", declaredHours: 15 },
    { id: 3, name: "Krzysztof Krawczyk", declaredHours: 63 }
  ];
  sprint = "sprint 3";

}
