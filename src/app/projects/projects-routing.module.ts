import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsTableComponent } from './projects-table/projects-table.component';
import { ProjectMembersComponent } from './project-members/project-members.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { JiraKeyComponent } from './jira-key/jira-key.component';
import { JiraProjectsComponent } from './jira-projects/jira-projects.component';
import { JiraConfigComponent } from './jira-config/jira-config.component';


const routes: Routes = [
  { path: '', component: ProjectsTableComponent, pathMatch: 'full' },
  { path: 'new-project', component: NewProjectComponent, pathMatch: 'full' },
  { path: 'project-members', component: ProjectMembersComponent, pathMatch: 'full' },
  { path: 'jira-key', component: JiraKeyComponent, pathMatch: 'full' },
  { path: 'jira-config', component: JiraConfigComponent, pathMatch: 'full' },
  { path: 'jira-projects', component: JiraProjectsComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ProjectsRoutingModule {
}
