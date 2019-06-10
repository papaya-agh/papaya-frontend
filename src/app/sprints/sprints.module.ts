import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { SprintsRoutingModule } from './sprints-routing.module';
import { NewSprintComponent } from './new-sprint/new-sprint.component';
import { PCommonModule } from '../p-common/p-common.module';
import { ButtonModule } from 'primeng/button';
import { CalendarModule, InputTextareaModule, InputTextModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [ NewSprintComponent ],
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
    InputTextareaModule,
  ]
})
export class SprintsModule {
}
