import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent, PlayerCardComponent } from './components';
import { dashboardRoutes } from './dashboard-routes';
import { MatCardModule, MatProgressSpinnerModule } from '@angular/material';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    DashboardComponent,
    PlayerCardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(dashboardRoutes)
  ]
})
export class DashboardModule { }
