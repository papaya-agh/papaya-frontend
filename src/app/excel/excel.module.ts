import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcelRoutingModule } from './excel-routing.module';
import { ExcelTableComponent } from './excel-table/excel-table.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { PCommonModule } from '../p-common/p-common.module';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { TimeFormaterPipe } from './time.pipe';
import { WorkersPipe } from './workers.pipe';
import { AvailabilitySummaryComponent } from './excel-table/availability-summary/availability-summary.component';
import { ProgressSpinnerModule } from 'primeng/primeng';

@NgModule({
  declarations: [ExcelTableComponent, TimeFormaterPipe, WorkersPipe, AvailabilitySummaryComponent],
  imports: [
    CommonModule,
    ExcelRoutingModule,
    TableModule,
    ButtonModule,
    FormsModule,
    PCommonModule,
    CardModule,
    ToastModule,
    ProgressSpinnerModule
  ]
})
export class ExcelModule { }
