import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.css']
})
export class ProjectsTableComponent implements OnInit {

  newCoef = 1.55;
  newName: string;

  constructor() { }

  ngOnInit() {
  }

  handleClick() {
    // read project name from input text
    // read coefficient
    // send POST /projects
  }
}
