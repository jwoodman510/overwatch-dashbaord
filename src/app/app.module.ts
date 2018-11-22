import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { routes } from './routes';
import { StatsDataService } from './services';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [AppComponent],
  providers: [StatsDataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
