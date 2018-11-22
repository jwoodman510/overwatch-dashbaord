import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Store } from '@ngxs/store';

import { BattleTag } from '@app/core/models';
import { AddBattleTag, BattleTagsState } from '@app/core/state';

import { AddCardDialogComponent } from '../add-card/add-card.dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  searchText: string;

  readonly battleTags$: Observable<Array<BattleTag>>;

  constructor(private store: Store, private dialog: MatDialog) {
    this.battleTags$ = this.store.select(BattleTagsState);
  }

  ngOnInit(): void {}

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
      .pipe(switchMap(x => this.store.dispatch(new AddBattleTag(x))))
      .subscribe();
  }
}
