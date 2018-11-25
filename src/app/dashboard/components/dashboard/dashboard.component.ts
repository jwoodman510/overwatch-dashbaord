import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

import { Select, Store } from '@ngxs/store';

import { BattleTag, Dashboard } from '@app/core/models';
import {
  AddBattleTag,
  AddDashboard,
  BattleTagsState,
  LoadBattleTags,
  UserState
} from '@app/core/state';

import { AddCardDialogComponent } from '../add-card/add-card.dialog';
import {
  AddDashboardDialogComponent
} from '../add-dashboard/add-dashboard.dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  header: string;
  searchText: string;
  dashboard: string;

  @Select(UserState.activeDashboard)
  dashboard$: Observable<Dashboard>;

  readonly battleTags$: Observable<Array<BattleTag>>;

  constructor(private store: Store, private dialog: MatDialog) {
    this.battleTags$ = this.store.select(BattleTagsState);
  }

  ngOnInit(): void {
    this.dashboard$
      .pipe(
        tap(x => (this.dashboard = x.key)),
        tap(x => (this.header = x.name)),
        switchMap(() => {
          return this.store.dispatch(new LoadBattleTags(this.dashboard));
        })
      )
      .subscribe();
  }

  filtered(bt: BattleTag): boolean {
    return bt.name.toLowerCase().indexOf(this.searchText.toLowerCase()) === -1;
  }

  addBattleTag(): void {
    const dialogRef = this.dialog.open(AddCardDialogComponent, {
      width: '300px',
      height: 'fit-content'
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(x => !!x),
        switchMap(x => this.store.dispatch(new AddBattleTag(this.dashboard, x)))
      )
      .subscribe();
  }

  addDashboard(): void {
    const dialogRef = this.dialog.open(AddDashboardDialogComponent, {
      width: '300px',
      height: 'fit-content'
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(x => x && x.length),
        switchMap(x => this.store.dispatch(new AddDashboard(x)))
      )
      .subscribe();
  }
}
