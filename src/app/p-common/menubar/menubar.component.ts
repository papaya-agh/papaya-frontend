import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { StoreService } from '../store.service';
import { UserRoleDto } from '../../declarations/models/user-role-dto';
import { KeycloakService } from 'keycloak-angular';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: [ './menubar.component.css' ]
})
export class MenubarComponent implements OnInit {

  @Input()
  userRole: UserRoleDto;

  @Input()
  currentProjectName: string;

  items: MenuItem[];

  constructor(private keycloakService: KeycloakService) {
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
        routerLink: [ '/projects' ],
      },
      {
        label: this.currentProjectName,
        routerLink: [ '/overview' ],
        visible: !!this.currentProjectName,
      },
      {
        label: 'Dostępność',
        icon: 'pi pi-fw pi-user',
        routerLink: [ '/availability' ],
        visible: !!this.userRole,
      },
      {
        label: 'Podsumowanie',
        icon: 'pi pi-fw pi-list',
        routerLink: [ '/excel' ],
        visible: this.userRole === 'ADMIN',
      },
      {
        label: 'Statystyki',
        icon: 'pi pi-fw pi-chart-bar',
        routerLink: [ '/excel/charts' ],
        visible: this.userRole === 'ADMIN',
      },
      { separator: true },
    ];
  }

  logout() {
    of(this.keycloakService.logout()).subscribe();
  }
}
