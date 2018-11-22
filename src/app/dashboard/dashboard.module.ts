import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

import { SharedModule } from '@app/shared/shared.module';

import {
  AddCardDialogComponent,
  DashboardComponent,
  PlayerCardComponent
} from './components';
import { dashboardRoutes } from './dashboard-routes';
import { BattletagService } from './services';

@NgModule({
  declarations: [
    AddCardDialogComponent,
    DashboardComponent,
    PlayerCardComponent
  ],
  imports: [SharedModule, RouterModule.forChild(dashboardRoutes)],
  entryComponents: [AddCardDialogComponent],
  providers: [BattletagService, CookieService]
})
export class DashboardModule {}
