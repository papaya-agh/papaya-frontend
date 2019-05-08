import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { LogoutComponent } from './auth/logout/logout.component';


const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [ AuthGuard ] },
  { path: 'example', canActivate: [ AuthGuard ], loadChildren: './example-module/example-module.module#ExampleModuleModule' },
  { path: 'projects', canActivate: [ AuthGuard ], loadChildren: './projects/projects.module#ProjectsModule' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
