import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';

import { Store } from '@ngxs/store';

import { PlayerStats } from '@app/core/models';
import { StatsDataService } from '@app/core/services';
import {
  AddBattleTag,
  BattleTagsState,
  RemoveBattleTag
} from '@app/core/state';
import { Platforms, Regions } from '@app/shared/constants';

import {
  AddCardData,
  AddCardDialogComponent
} from '../add-card/add-card.dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input()
  searchText: string;

  battleTags$: Observable<Array<string>>;

  private readonly errors: Set<string>;
  private readonly stats: Map<string, PlayerStats>;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private statsDataService: StatsDataService
  ) {
    this.errors = new Set<string>();
    this.stats = new Map<string, PlayerStats>();
  }

  ngOnInit(): void {
    this.battleTags$ = this.store
      .select(BattleTagsState)
      .pipe(map(x => this.filter(x, this.searchText)));
  }

  getStats(bt: string): PlayerStats {
    return this.stats.get(bt);
  }

  hasError(bt: string): boolean {
    return this.errors.has(bt);
  }

  retry(bt: string): void {
    this.refresh(bt);
  }

  refresh(bt: string): void {
    this.errors.delete(bt);
    this.stats.delete(bt);
    this.loadProfile(bt).subscribe();
  }

  remove(bt: string): void {
    this.errors.delete(bt);
    this.stats.delete(bt);
    this.store.dispatch(new RemoveBattleTag(bt));
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddCardDialogComponent, {
      width: '300px',
      height: 'fit-content'
    });

    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        switchMap((x: AddCardData) =>
          this.store
            .dispatch(new AddBattleTag(x.battleTag))
            .pipe(
              switchMap(() =>
                this.loadProfile(x.battleTag, x.platform, x.region)
              )
            )
        )
      )
      .subscribe();
  }

  private loadProfile(
    bt: string,
    platform?: Platform,
    region?: Region
  ): Observable<void> {
    return this.statsDataService
      .getProfile(platform || Platforms.PC, region || Regions.NA, bt)
      .pipe(
        take(1),
        tap(x => this.stats.set(bt, x)),
        catchError(() => {
          this.errors.add(bt);

          return of(undefined);
        })
      );
  }

  private filter = (data: Array<string>, searchText: string): Array<string> =>
    !searchText
      ? data
      : data.filter(x => x.toLowerCase().indexOf(searchText.toLowerCase()) > 0)
}
