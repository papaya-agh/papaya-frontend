import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvailabilityTableComponent } from './availability-table/availability-table.component';


const routes: Routes = [
  { path: '', component: AvailabilityTableComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AvailabilityRoutingModule {
}
