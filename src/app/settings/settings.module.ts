import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';

import { SettingsComponent } from './components';
import { settingsRoutes } from './settings-routes';

@NgModule({
  declarations: [SettingsComponent],
  imports: [SharedModule, RouterModule.forChild(settingsRoutes)]
})
export class SettingsModule {}
