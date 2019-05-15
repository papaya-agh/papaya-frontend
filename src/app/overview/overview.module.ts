import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { OverviewRoutingModule } from './overview-routing.module';
import { PCommonModule } from '../p-common/p-common.module';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [ ProjectOverviewComponent ],
  imports: [
    CommonModule,
    OverviewRoutingModule,
    PCommonModule,
    ToastModule,
  ]
})
export class OverviewModule {
}
