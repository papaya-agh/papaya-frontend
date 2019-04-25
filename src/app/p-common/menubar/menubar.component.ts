import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: [ './menubar.component.css' ]
})
export class MenubarComponent implements OnInit {

  items: MenuItem[];

  constructor() {
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Projekty',
        icon: 'pi pi-fw pi-list',
        routerLink: [ '/projects' ]
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
