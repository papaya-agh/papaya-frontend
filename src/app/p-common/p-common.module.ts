import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';

import { MenubarComponent } from './menubar/menubar.component';

@NgModule({
  declarations: [ MenubarComponent ],
  exports: [
    MenubarComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    ButtonModule,
  ]
})
export class PCommonModule {
}
