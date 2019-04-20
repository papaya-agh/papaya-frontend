import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';

import { ExampleComponentComponent } from './example-component/example-component.component';

const routes: Routes = [
  { path: '', component: ExampleComponentComponent, pathMatch: 'full' },
  { path: 'example', component: ExampleComponentComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CardModule,
    MenubarModule,
    ButtonModule
  ],
  exports: [ RouterModule, CardModule, MenubarModule, ButtonModule ]
})
export class ExampleModuleRoutingModule {
}
