import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { OverwatchDataService } from './services';
import { routes } from './routes';
import { Environment } from './models';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: Environment,
      useValue: environment
    },
    OverwatchDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
