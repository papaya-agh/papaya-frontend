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
        label: '',
        icon: 'pi pi-fw pi-cog',
        routerLink: [ '/settings' ]
      }
    ];
  }

}
