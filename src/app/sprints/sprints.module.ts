import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { SprintsRoutingModule } from './sprints-routing.module';
import { NewSprintComponent } from './new-sprint/new-sprint.component';
import { PCommonModule } from '../p-common/p-common.module';
import { ButtonModule } from 'primeng/button';
import { CalendarModule, InputTextModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CloseSprintComponent } from './close-sprint/close-sprint.component';

@NgModule({
  declarations: [ NewSprintComponent, CloseSprintComponent ],
  imports: [
    CommonModule,
    SprintsRoutingModule,
    FormsModule,
    CardModule,
    PCommonModule,
    ButtonModule,
    CalendarModule,
    TableModule,
    InputTextModule,
    ToastModule,
  ]
})
export class SprintsModule {
}
