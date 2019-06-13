import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewSprintComponent } from './new-sprint/new-sprint.component';
import { SprintsTableComponent } from './sprints-table/sprints-table.component';

const routes: Routes = [
  { path: 'new-sprint', component: NewSprintComponent },
  { path: 'sprints-table', component: SprintsTableComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class SprintsRoutingModule {
}
