import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Store } from '@ngxs/store';

import { BattleTag, Dashboard } from '@app/core/models';
import { AddBattleTag, BattleTagsState, LoadBattleTags } from '@app/core/state';

import { AddCardDialogComponent } from '../add-card/add-card.dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboard: string;
  searchText: string;

  readonly battleTags$: Observable<Array<BattleTag>>;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.battleTags$ = this.store.select(BattleTagsState);
  }

  ngOnInit(): void {
    this.dashboard =
      this.route.snapshot.data['dashboard'] || Dashboard.defaultName;

    this.store.dispatch(new LoadBattleTags(this.dashboard));
  }

  filtered(bt: BattleTag): boolean {
    return bt.name.toLowerCase().indexOf(this.searchText.toLowerCase()) === -1;
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddCardDialogComponent, {
      width: '300px',
      height: 'fit-content'
    });

    dialogRef
      .afterClosed()
      .pipe(
        switchMap(x => this.store.dispatch(new AddBattleTag(this.dashboard, x)))
      )
      .subscribe();
  }
}
