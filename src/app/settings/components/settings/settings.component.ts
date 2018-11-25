import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { Select, Store } from '@ngxs/store';

import { Dashboard } from '@app/core/models';
import { UpdateDashboard, UserState } from '@app/core/state';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  readonly header = 'Settings';

  constructor(private store: Store) {}

  @Select(UserState.dashboards)
  dashboards$: Observable<Array<Dashboard>>;

  setDefault(event: MouseEvent, dashboard: Dashboard): void {
    event.preventDefault();
    event.stopPropagation();

    dashboard.isDefault = dashboard.isDefault ? false : true;

    this.store.dispatch(new UpdateDashboard(dashboard));
  }
}
