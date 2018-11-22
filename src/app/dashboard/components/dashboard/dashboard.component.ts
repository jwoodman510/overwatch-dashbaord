import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { of } from 'rxjs';
import { catchError, filter, take, tap } from 'rxjs/operators';

import { PlayerStats } from '@app/core/models';
import { StatsDataService } from '@app/core/services';
import { Platforms, Regions } from '@app/shared/constants';

import { BattletagService } from '../../services';
import { AddCardDialogComponent } from '../add-card/add-card.dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input()
  searchText: string;

  readonly stats: Map<string, PlayerStats>;

  private region = Regions.NA;
  private platform = Platforms.PC;
  private errors: Set<string>;
  private battleTags: Array<string>;

  constructor(
    private dialog: MatDialog,
    private battletagService: BattletagService,
    private statsDataService: StatsDataService
  ) {
    this.stats = new Map<string, PlayerStats>();
    this.errors = new Set<string>();
    this.battleTags = this.sort(this.battletagService.get());
  }

  ngOnInit(): void {
    this.battleTags.forEach(x => this.loadProfile(x));
  }

  getBattleTags(): Array<string> {
    return this.searchText
      ? this.battleTags.filter(
          x => x.toLowerCase().indexOf(this.searchText.toLowerCase()) >= 0
        )
      : this.battleTags;
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
    this.loadProfile(bt);
  }

  remove(bt: string): void {
    this.errors.delete(bt);
    this.stats.delete(bt);
    this.battleTags = this.battleTags.filter(x => x !== bt);
    this.battletagService.deleteEntry(bt);
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
        filter(x => x && x.battletag),
        tap(x => (this.battleTags = [x.battletag].concat(this.battleTags))),
        tap(x => this.loadProfile(x.battletag, x.platform, x.region)),
        tap(x => this.battletagService.addEntry(x.battletag))
      )
      .subscribe();
  }

  private loadProfile(bt: string, platform?: Platform, region?: Region): void {
    this.statsDataService
      .getProfile(platform || this.platform, region || this.region, bt)
      .pipe(
        take(1),
        tap(x => this.stats.set(bt, x)),
        catchError(() => {
          this.errors.add(bt);

          return of(undefined);
        })
      )
      .subscribe();
  }

  private sort = (data: Array<string>): Array<string> => {
    return data.sort((a, b) => {
      a = a.toLowerCase();
      b = b.toLowerCase();

      return a > b ? 1 : b > a ? -1 : 0;
    });
  }
}
