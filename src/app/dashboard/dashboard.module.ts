import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'; import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  MatCardModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material';

import { dashboardRoutes } from './dashboard-routes';
import { DashboardComponent, PlayerCardComponent } from './components';

@NgModule({
  declarations: [
    DashboardComponent,
    PlayerCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(dashboardRoutes)
  ]
})
export class DashboardModule { }
