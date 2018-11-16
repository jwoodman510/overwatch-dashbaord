import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './components';
import { dashboardRoutes } from './dashboard-routes';
import { MatCardModule, MatProgressSpinnerModule } from '@angular/material';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(dashboardRoutes)
  ]
})
export class DashboardModule { }
