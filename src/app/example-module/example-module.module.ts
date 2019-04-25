import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleComponentComponent } from './example-component/example-component.component';
import { ExampleModuleRoutingModule } from './example-module-routing.module';
import { PCommonModule } from '../p-common/p-common.module';

@NgModule({
  declarations: [ ExampleComponentComponent ],
  imports: [
    CommonModule,
    ExampleModuleRoutingModule,
    PCommonModule,
  ]
})
export class ExampleModuleModule {
}
