import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewProjectComponent } from './new-project/new-project.component';
import { ProjectsTableComponent } from './projects-table/projects-table.component';


const routes: Routes = [
  { path: '', component: ProjectsTableComponent, pathMatch: 'full' },
  { path: 'new', component: NewProjectComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ProjectsRoutingModule {
}
