import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleComponentComponent } from './example-component/example-component.component';
import { ExampleModuleRoutingModule } from './example-module-routing.module';
import { AnotherComponentComponent } from './another-component/another-component.component';
import { BarComponent } from './bar/bar.component';

@NgModule({
  declarations: [ ExampleComponentComponent, AnotherComponentComponent, BarComponent ],
  imports: [
    CommonModule,
    ExampleModuleRoutingModule
  ]
})
export class ExampleModuleModule {
}
