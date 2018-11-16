import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { OverwatchDataService } from './services';
import { routes } from './routes';
import { Environment } from './models';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent
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
