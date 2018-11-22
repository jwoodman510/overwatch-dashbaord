import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';

import {
  AddCardDialogComponent,
  DashboardComponent,
  PlayerCardComponent
} from './components';
import { dashboardRoutes } from './dashboard-routes';

@NgModule({
  declarations: [
    AddCardDialogComponent,
    DashboardComponent,
    PlayerCardComponent
  ],
  imports: [SharedModule, RouterModule.forChild(dashboardRoutes)],
  entryComponents: [AddCardDialogComponent]
})
export class DashboardModule {}
