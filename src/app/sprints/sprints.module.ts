import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { SprintsRoutingModule } from './sprints-routing.module';
import { NewSprintComponent } from './new-sprint/new-sprint.component';
import { PCommonModule } from '../p-common/p-common.module';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/primeng';

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
  ]
})
export class SprintsModule {
}
