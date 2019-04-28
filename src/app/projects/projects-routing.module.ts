import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsTableComponent } from './projects-table/projects-table.component';
import { NewProjectComponent } from './new-project/new-project.component';


const routes: Routes = [
  { path: '', component: ProjectsTableComponent, pathMatch: 'full' },
  { path: 'new-project', component: NewProjectComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ProjectsRoutingModule {
}
