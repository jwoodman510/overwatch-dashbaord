import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { NgxsModule } from '@ngxs/store';
import { LZStringModule, LZStringService } from 'ng-lz-string';
import { ResponsiveModule } from 'ngx-responsive';
import { environment } from 'src/environments/environment';

import { Environment } from './models';
import { BattleTagService, StorageService } from './services';
import { BattleTagsState } from './state';

@NgModule({
  imports: [
    HttpClientModule,
    LZStringModule,
    NgxsModule.forRoot([BattleTagsState]),
    ResponsiveModule.forRoot()
  ],
  providers: [
    {
      provide: Environment,
      useValue: environment
    },
    BattleTagService,
    StorageService,
    LZStringService
  ]
})
export class CoreModule {}
