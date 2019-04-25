import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: [ './projects-table.component.css' ]
})
export class ProjectsTableComponent implements OnInit {

  newCoef = 1.55;
  newName: string;

  projects = [
    { id: 1, name: 'awesome', admin: false, link: '/example' },
    { id: 2, name: 'qwerty', admin: true, link: 'b' },
    { id: 3, name: 'opaque', admin: false, link: '/example' }
  ];

  constructor() {
  }

  ngOnInit() {
  }

  handleClick() {
    // read project name from input text
    // read coefficient
    // send POST /projects

    // mock
    this.projects.push(
      {
        id: this.projects.length + 1,
        name: this.newName,
        admin: true,
        link: 'xd'
      });
  }
}
