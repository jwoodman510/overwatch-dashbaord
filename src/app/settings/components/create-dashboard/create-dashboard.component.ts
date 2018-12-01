import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngxs/store';

import { Dashboard, User } from '@app/core/models';
import { AddDashboard, UserState } from '@app/core/state';

@Component({
  selector: 'app-create-dashboard',
  templateUrl: './create-dashboard.component.html',
  styleUrls: ['./create-dashboard.component.scss']
})
export class CreateDashboardComponent implements OnInit {
  @Output()
  readonly save = new EventEmitter<void>();

  @Output()
  readonly cancel = new EventEmitter<void>();

  dashboard: Dashboard;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.dashboard = new Dashboard();
  }

  saveClicked(): void {
    this.store.dispatch(
      new AddDashboard(this.dashboard.name, this.dashboard.isDefault)
    );

    this.save.emit();
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
