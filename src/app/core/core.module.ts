import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ResponsiveModule } from 'ngx-responsive';
import { environment } from 'src/environments/environment';

import { Environment } from '@app/models/environment';

@NgModule({
  imports: [HttpClientModule, ResponsiveModule.forRoot()],
  providers: [
    {
      provide: Environment,
      useValue: environment
    }
  ]
})
export class CoreModule {}
