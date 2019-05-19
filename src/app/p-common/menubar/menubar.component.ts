import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { StoreService } from '../store.service';
import { UserRoleDto } from '../../declarations/models/user-role-dto';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: [ './menubar.component.css' ]
})
export class MenubarComponent implements OnInit {

  @Input()
  userRole: UserRoleDto;

  items: MenuItem[];
  currentProjectName: string;

  constructor(private storeService: StoreService) {
    this.currentProjectName = this.storeService.getCurrentProjectName();
  }

  ngOnInit() {
    this.items = [
      {
        icon: 'pi',
        style: {
          'background-image': 'url("../../../assets/papaya-logo-32-32.png")',
          'background-repeat': 'no-repeat',
          'background-position': 'center',
          'margin-left': '5px',
        },
        routerLink: [ '/projects' ]
      },
      {
        label: this.currentProjectName,
        routerLink: [ '/overview' ]
      },
      {
        label: 'Dostępność',
        icon: 'pi pi-fw pi-user',
        routerLink: [ '/availability' ]
      },
      {
        label: 'Excel',
        icon: 'pi pi-fw pi-table',
        routerLink: [ '/excel' ],
        visible: this.userRole === 'ADMIN',
      },
      { separator: true },
    ];
  }

}
