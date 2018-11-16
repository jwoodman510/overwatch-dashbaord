import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StatsDataService } from './services';
import { routes } from './routes';
import { Environment } from './models';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
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
    StatsDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
