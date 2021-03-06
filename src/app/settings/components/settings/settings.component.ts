import { Component } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Select, Store } from '@ngxs/store';

import { Dashboard, User } from '@app/core/models';
import { DeleteDashboard, UpdateDashboard, UserState } from '@app/core/state';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  isCreate = false;

  readonly header = 'Settings';

  @Select(UserState.dashboards)
  dashboards$: Observable<Array<Dashboard>>;

  constructor(private store: Store) {}

  setDefault(event: MouseEvent, dashboard: Dashboard): void {
    event.preventDefault();
    event.stopPropagation();

    dashboard.isDefault = dashboard.isDefault ? false : true;

    this.store.dispatch(new UpdateDashboard(dashboard));
  }

  addDashboard(): void {
    this.isCreate = true;
  }

  updateName(dashboard: Dashboard, name: string): void {
    dashboard.name = name;

    this.store.dispatch(new UpdateDashboard(dashboard));
  }

  delete(dashboard: Dashboard): void {
    this.store.dispatch(new DeleteDashboard(dashboard));
  }

  invalid(dashboard: Dashboard, name: string): Observable<boolean> {
    if (!name || !name.length) {
      return of(true);
    }

    return this.store.selectOnce(UserState).pipe(
      map((x: User) => x.dashboards),
      map(x => x.filter(y => y.key !== dashboard.key)),
      map(x => x.some(y => y.name === name))
    );
  }
}
