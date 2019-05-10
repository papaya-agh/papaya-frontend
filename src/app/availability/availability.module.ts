import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvailabilityRoutingModule } from './availability-routing.module';
import { AvailabilityTableComponent } from './availability-table/availability-table.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { PCommonModule } from '../p-common/p-common.module';
import { ToastModule } from 'primeng/toast';
import { SpinnerModule } from 'primeng/primeng';

@NgModule({
  declarations: [ AvailabilityTableComponent ],
  imports: [
    CommonModule,
    AvailabilityRoutingModule,
    TableModule,
    ButtonModule,
    FormsModule,
    CardModule,
    PCommonModule,
    ToastModule,
    SpinnerModule,
  ]
})
export class AvailabilityModule {
}
