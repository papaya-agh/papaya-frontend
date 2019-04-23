import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleComponentComponent } from './example-component/example-component.component';
import { ExampleModuleRoutingModule } from './example-module-routing.module';
import { MenubarComponent } from '../common/menubar/menubar.component';

@NgModule({
  declarations: [ ExampleComponentComponent, MenubarComponent ],
  imports: [
    CommonModule,
    ExampleModuleRoutingModule
  ]
})
export class ExampleModuleModule {
}
