import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ResponsiveModule } from 'ngx-responsive';
import { environment } from 'src/environments/environment';

import { Environment } from './models';
import { StatsDataService } from './services';

@NgModule({
  imports: [HttpClientModule, ResponsiveModule.forRoot()],
  providers: [
    {
      provide: Environment,
      useValue: environment
    },
    StatsDataService
  ]
})
export class CoreModule {}
