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

@NgModule({
  declarations: [ExcelTableComponent],
  imports: [
    CommonModule,
    ExcelRoutingModule,
    TableModule,
    ButtonModule,
    FormsModule,
    PCommonModule,
    CardModule,
    ToastModule
  ]
})
export class ExcelModule { }