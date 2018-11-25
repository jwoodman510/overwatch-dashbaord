import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { Select, Store } from '@ngxs/store';

import { Dashboard } from './core/models';
import {
  LoadUser,
  SetActiveDashboard,
  UpdateDashboard,
  UserState
} from './core/state';
import { DashboardComponent } from './dashboard/components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  canEdit = false;
  header: string;
  editMode = false;
  dashboardName: string;

  @Select(UserState.dashboards)
  dashboards$: Observable<Array<Dashboard>>;

  @Select(UserState.activeDashboard)
  activeDashboard$: Observable<Dashboard>;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadUser());
  }

  activateRoute(event: any): void {
    this.canEdit = event instanceof DashboardComponent;

    if (!this.canEdit) {
      this.header = event.header;
    }
  }

  editDashboard(): void {
    this.activeDashboard$
      .pipe(
        take(1),
        tap(x => (this.dashboardName = x.name)),
        tap(() => (this.editMode = true))
      )
      .subscribe();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.keyCode === 13) {
      this.updateDashboard();
    }
  }

  updateDashboard(): void {
    if (!this.dashboardName || !this.dashboardName.length) {
      this.editMode = false;

      return;
    }

    this.activeDashboard$
      .pipe(
        take(1),
        tap(x => (x.name = this.dashboardName)),
        switchMap(x => this.store.dispatch(new UpdateDashboard(x))),
        tap(() => (this.editMode = false))
      )
      .subscribe();
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
