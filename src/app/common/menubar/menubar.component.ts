import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: [ './menubar.component.css' ]
})
export class MenubarComponent implements OnInit {

  constructor() {
  }

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Papaya',
        // icon: 'papaya-icon',
        routerLink: [ '/projects' ]
      },
      {
        label: 'Availability',
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
        label: 'New sprint',
        icon: 'pi pi-fw pi-plus',
        routerLink: [ '/new-sprint' ]
      }
    ];
  }

}
