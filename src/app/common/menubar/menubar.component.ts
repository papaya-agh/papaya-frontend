import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
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
        routerLink: [ '/' ]
      },
      {
        label: 'Dostępność',
        icon: 'pi pi-fw pi-user',
        routerLink: [ '/example/availability' ]
      },
      {
        label: 'Excel',
        icon: 'pi pi-fw pi-table',
        routerLink: [ '/example/excel' ]
      },
      { separator: true },
      {
        label: '',
        icon: 'pi pi-fw pi-cog',
        routerLink: [ '/example/settings' ]
      }
    ];
  }

}
