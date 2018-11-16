import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      }
    ]
  }
];
