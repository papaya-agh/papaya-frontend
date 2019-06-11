import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';

import { ProjectOverviewComponent } from './project-overview/project-overview.component';

const routes: Routes = [
  { path: '#/', component: ProjectOverviewComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CardModule,
    MenubarModule,
    ButtonModule,
  ],
  exports: [ RouterModule, CardModule, MenubarModule, ButtonModule ]
})
export class OverviewRoutingModule {
}
