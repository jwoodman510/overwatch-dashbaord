import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { NgxsModule } from '@ngxs/store';
import { CookieService } from 'ngx-cookie-service';
import { ResponsiveModule } from 'ngx-responsive';
import { environment } from 'src/environments/environment';

import { Environment } from './models';
import { BattleTagService, StatsDataService } from './services';
import { BattleTagsState } from './state';

@NgModule({
  imports: [
    HttpClientModule,
    NgxsModule.forRoot([BattleTagsState]),
    ResponsiveModule.forRoot()
  ],
  providers: [
    {
      provide: Environment,
      useValue: environment
    },
    BattleTagService,
    CookieService,
    StatsDataService
  ]
})
export class CoreModule {}
