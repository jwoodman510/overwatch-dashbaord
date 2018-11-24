import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NgxsModule } from '@ngxs/store';

import { SharedModule } from '@app/shared/shared.module';

import {
  AddCardDialogComponent,
  AddDashboardDialogComponent,
  DashboardComponent,
  PlayerCardComponent
} from './components';
import { dashboardRoutes } from './dashboard-routes';
import { StatsDataService } from './services';
import { StatsState } from './state';

@NgModule({
  declarations: [
    AddCardDialogComponent,
    AddDashboardDialogComponent,
    DashboardComponent,
    PlayerCardComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(dashboardRoutes),
    NgxsModule.forFeature([StatsState])
  ],
  entryComponents: [AddCardDialogComponent, AddDashboardDialogComponent],
  providers: [StatsDataService]
})
export class DashboardModule {}
