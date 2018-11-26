import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { Select, Store } from '@ngxs/store';

import { Dashboard } from './core/models';
import { LoadUser, SetActiveDashboard, UserState } from './core/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  header: string;

  @Select(UserState.dashboards)
  dashboards$: Observable<Array<Dashboard>>;

  @Select(UserState.activeDashboard)
  activeDashboard$: Observable<Dashboard>;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadUser());
  }

  activateRoute(event: any): void {
    this.header = event.header;
  }

  goToDefaultDashboard(): void {
    this.dashboards$
      .pipe(
        take(1),
        map(x => x.find(y => y.isDefault)),
        switchMap(x => this.store.dispatch(new SetActiveDashboard(x))),
        tap(() => this.router.navigate(['/dashboard']))
      )
      .subscribe();
  }

  goToDashboard(dashboard: Dashboard): void {
    this.store.dispatch(new SetActiveDashboard(dashboard));
    this.router.navigate(['/dashboard']);
  }

  isActive(dashboard: Dashboard): Observable<boolean> {
    return this.activeDashboard$.pipe(map(x => x.key === dashboard.key));
  }
}
