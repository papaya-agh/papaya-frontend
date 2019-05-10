import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsTableComponent } from './projects-table/projects-table.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { PCommonModule } from '../p-common/p-common.module';
import { NewProjectComponent } from './new-project/new-project.component';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [ ProjectsTableComponent, NewProjectComponent ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    TableModule,
    ButtonModule,
    SliderModule,
    FormsModule,
    PCommonModule,
    ToastModule,
  ]
})
export class ProjectsModule {
}
