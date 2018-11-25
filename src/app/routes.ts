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
  },
  {
    path: 'settings',
    children: [
      {
        path: '',
        loadChildren: './settings/settings.module#SettingsModule'
      }
    ]
  }
];
