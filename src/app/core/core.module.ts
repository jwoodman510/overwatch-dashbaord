import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { ResponsiveModule } from 'ngx-responsive';
import { environment } from 'src/environments/environment';

import { Environment } from './models';
import { BattletagService, StatsDataService } from './services';

@NgModule({
  imports: [HttpClientModule, ResponsiveModule.forRoot()],
  providers: [
    {
      provide: Environment,
      useValue: environment
    },
    BattletagService,
    CookieService,
    StatsDataService
  ]
})
export class CoreModule {}
