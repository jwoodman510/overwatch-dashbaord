import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';

import { CreateDashboardComponent, SettingsComponent } from './components';
import { settingsRoutes } from './settings-routes';

@NgModule({
  declarations: [CreateDashboardComponent, SettingsComponent],
  imports: [SharedModule, RouterModule.forChild(settingsRoutes)]
})
export class SettingsModule {}
