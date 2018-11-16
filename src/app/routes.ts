import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      }
    ]
  }
];
