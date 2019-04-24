import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvailabilityRoutingModule } from './availability-routing.module';
import { AvailabilityTableComponent } from './availability-table/availability-table.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ AvailabilityTableComponent ],
  imports: [
    CommonModule,
    AvailabilityRoutingModule,
    TableModule,
    ButtonModule,
    FormsModule,
  ]
})
export class AvailabilityModule {
}
