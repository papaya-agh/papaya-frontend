import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleComponentComponent } from './example-component/example-component.component';
import { ExampleModuleRoutingModule } from './example-module-routing.module';
import { PCommonModule } from '../p-common/p-common.module';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [ ExampleComponentComponent ],
  imports: [
    CommonModule,
    ExampleModuleRoutingModule,
    PCommonModule,
    ToastModule,
  ]
})
export class ExampleModuleModule {
}
