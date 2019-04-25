import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PCommonRoutingModule } from './p-common-routing.module';
import { MenubarComponent } from './menubar/menubar.component';

@NgModule({
  declarations: [ MenubarComponent ],
  exports: [
    MenubarComponent
  ],
  imports: [
    CommonModule,
    PCommonRoutingModule
  ]
})
export class PCommonModule {
}
