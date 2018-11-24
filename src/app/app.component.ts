import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Select, Store } from '@ngxs/store';

import { Dashboard } from './core/models';
import { LoadUser, SetActiveDashboard, UserState } from './core/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  readonly title = 'overwatch-dashboard';

  @Select(UserState.dashboards)
  dashboards$: Observable<Array<Dashboard>>;

  @Select(UserState.activeDashboard)
  activeDashboard$: Observable<Dashboard>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadUser());
  }

  goToDashboard(dashboard: Dashboard): void {
    this.store.dispatch(new SetActiveDashboard(dashboard));
  }
}
