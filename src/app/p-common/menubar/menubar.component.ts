import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: [ './menubar.component.css' ]
})
export class MenubarComponent implements OnInit {

  items: MenuItem[];
  currentProject: string;

  constructor() {
    this.currentProject = localStorage.getItem('papaya-project');
  }

  ngOnInit() {
    this.items = [
      {
        icon: 'pi',
        style: {
          'background-image': 'url("../../../assets/papaya-logo-32-32.png")',
          'background-repeat': 'no-repeat',
          'background-position': 'center'
        },
        routerLink: [ '/projects' ]
      },
      {
        label: this.currentProject,
        routerLink: [ '/example' ]
      },
      {
        label: 'Dostępność',
        icon: 'pi pi-fw pi-user',
        routerLink: [ '/availability' ]
      },
      {
        label: 'Excel',
        icon: 'pi pi-fw pi-table',
        routerLink: [ '/excel' ]
      },
      { separator: true },
      {
        label: 'Nowy sprint',
        icon: 'pi pi-fw pi-plus',
        routerLink: [ '/new-sprint' ]
      }
    ];
  }

}
