import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MenubarModule,
    ButtonModule,
  ],
  exports: [ RouterModule, MenubarModule, ButtonModule ]
})
export class PCommonRoutingModule {
}
