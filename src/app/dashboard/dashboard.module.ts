import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './components';
import { dashboardRoutes } from './dashboard-routes';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ]
})
export class DashboardModule { }
