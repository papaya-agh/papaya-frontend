import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ExampleComponentComponent } from './example-component/example-component.component';
import { AnotherComponentComponent } from './another-component/another-component.component';

const routes: Routes = [
  { path: '', component: ExampleComponentComponent, pathMatch: 'full' },
  { path: 'example', component: ExampleComponentComponent },
  { path: 'another', component: AnotherComponentComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CardModule
  ],
  exports: [ RouterModule, CardModule ]
})
export class ExampleModuleRoutingModule {
}
