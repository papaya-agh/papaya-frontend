import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExcelTableComponent } from './excel-table/excel-table.component';


const routes: Routes = [
  { path: '', component: ExcelTableComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ExcelRoutingModule {
}
