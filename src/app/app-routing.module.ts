import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAuthGuard } from './auth/app-auth-guard.service';


const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'overview', canActivate: [ AppAuthGuard ], loadChildren: './overview/overview.module#OverviewModule' },
  { path: 'projects', canActivate: [ AppAuthGuard ], loadChildren: './projects/projects.module#ProjectsModule' },
  { path: 'sprints', canActivate: [ AppAuthGuard ], loadChildren: './sprints/sprints.module#SprintsModule' },
  { path: 'availability', canActivate: [ AppAuthGuard ], loadChildren: './availability/availability.module#AvailabilityModule' },
  { path: 'excel', canActivate: [ AppAuthGuard ], loadChildren: './excel/excel.module#ExcelModule' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
