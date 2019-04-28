import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsTableComponent } from './projects-table/projects-table.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PCommonModule } from '../p-common/p-common.module';
import { NewProjectComponent } from './new-project/new-project.component';
import { ProjectMembersComponent } from './project-members/project-members.component';
import { CardModule } from 'primeng/card';
import { BlockUIModule, DropdownModule } from 'primeng/primeng';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [ ProjectsTableComponent, NewProjectComponent, ProjectMembersComponent, ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    TableModule,
    ButtonModule,
    SliderModule,
    FormsModule,
    PCommonModule,
    CardModule,
    DropdownModule,
    BlockUIModule,
    ReactiveFormsModule,
    ToastModule,
  ]
})
export class ProjectsModule {
}
