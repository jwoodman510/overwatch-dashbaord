import { Component, OnInit, Input } from '@angular/core';
import { PlayerStats, Environment } from 'src/app/models';
import { StatsDataService } from 'src/app/services';
import {take, tap, catchError, filter} from 'rxjs/operators';
import { Regions, Platforms } from 'src/app/constants';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material';
import { AddCardDialogComponent } from '../add-card/add-card-dialog';

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

  constructor(private dialog: MatDialog, private statsDataService: StatsDataService) {
      this.stats = new Map<string, PlayerStats>();
      this.errors = new Set<string>();
      this.battleTags = this.sort([
        'woodman#11497',
        'woodman#11369',
        'JonnyPGood#1682',
        'PyroMax#11230',
        'FartMckenzie#1876',
        'hannah#12408',
        'KyleFresco#2795',
        'KyleFresco#11192',
        'MillaTime#11186',
        'MillaTime#11829',
      ]);
  }

  ngOnInit(): void {
    this.battleTags.forEach(x => this.loadProfile(x));
  }

  getBattleTags(): Array<string> {
    return this.searchText
      ? this.battleTags.filter(x => x.toLowerCase().indexOf(this.searchText.toLowerCase()) >= 0)
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
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddCardDialogComponent, {
      width: '300px',
      height: 'fit-content'
    });

    dialogRef.afterClosed().pipe(
      take(1),
      filter(x => x && x.battletag),
      tap(x => this.battleTags = [x.battletag].concat(this.battleTags)),
      tap(x => this.loadProfile(x.battletag, x.platform, x.region))
    ).subscribe();
  }

  private loadProfile(bt: string, platform?: Platform, region?: Region): void {
    this.statsDataService.getProfile(platform || this.platform, region || this.region, bt).pipe(
      take(1),
      tap(x => this.stats.set(bt, x)),
      catchError(() => {
        this.errors.add(bt);

        return of(undefined);
      }),
    ).subscribe();
  }

  private sort = (data: Array<string>): Array<string> => {
    return data.sort((a, b) => {
      a = a.toLowerCase();
      b = b.toLowerCase();

      return a > b ? 1 : b > a ? -1 : 0;
    });
  }
}
