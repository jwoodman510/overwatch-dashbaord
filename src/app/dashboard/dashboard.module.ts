import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'; import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import {
  MatCardModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatSelectModule
} from '@angular/material';

import { dashboardRoutes } from './dashboard-routes';
import { DashboardComponent, PlayerCardComponent, AddCardDialogComponent } from './components';
import { BattletagService } from './services';

@NgModule({
  declarations: [
    AddCardDialogComponent,
    DashboardComponent,
    PlayerCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    RouterModule.forChild(dashboardRoutes)
  ],
  entryComponents: [AddCardDialogComponent],
  providers: [BattletagService, CookieService]
})
export class DashboardModule { }
