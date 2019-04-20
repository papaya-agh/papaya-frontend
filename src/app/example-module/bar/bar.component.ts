import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {

  constructor() { }
    items: MenuItem[];

    ngOnInit() {
      this.items = [
        {
          label: 'Papaya',
          //icon: 'papaya-icon',
          routerLink: ['/']
        },
        {
          label: 'Dostępność',
          icon: 'pi pi-fw pi-user',
          routerLink: ['/example/availability']
        },
        {
          label: 'Excel',
          icon: 'pi pi-fw pi-table',
          routerLink: ['/example/excel']
        },
        {separator:true},
        {
          label: '',
          icon: 'pi pi-fw pi-cog',
          routerLink: ['/example/settings']
        }
      ];
    }

}
