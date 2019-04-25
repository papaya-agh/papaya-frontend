import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { LogoutComponent } from './auth/logout/logout.component';


const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [ AuthGuard ] },
  { path: 'overview', canActivate: [ AuthGuard ], loadChildren: './overview/overview.module#OverviewModule' },
  { path: 'projects', canActivate: [ AuthGuard ], loadChildren: './projects/projects.module#ProjectsModule' },
  { path: 'sprints', canActivate: [ AuthGuard ], loadChildren: './sprints/sprints.module#SprintsModule' },
  { path: 'availability', canActivate: [ AuthGuard ], loadChildren: './availability/availability.module#AvailabilityModule' },
  { path: 'excel', canActivate: [AuthGuard], loadChildren: './excel/excel.module#ExcelModule' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
