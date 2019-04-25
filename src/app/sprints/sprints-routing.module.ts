import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewSprintComponent } from './new-sprint/new-sprint.component';
import { CloseSprintComponent } from './close-sprint/close-sprint.component';

const routes: Routes = [
  { path: 'new-sprint', component: NewSprintComponent },
  { path: 'close-sprint', component: CloseSprintComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class SprintsRoutingModule {
}
