import { Component, OnInit } from '@angular/core';
import { PlayerStats, Environment } from 'src/app/models';
import { StatsDataService } from 'src/app/services';
import {take, tap} from 'rxjs/operators';
import { Regions, Platforms } from 'src/app/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  readonly battleTags: Array<string>;
  readonly stats: Map<string, PlayerStats>;

  private region = Regions.NA;
  private platform = Platforms.PC;

  constructor(private statsDataService: StatsDataService) {
      this.stats = new Map<string, PlayerStats>();
      this.battleTags = [
        'woodman#11497',
        'woodman#11369',
        'JonnyPGood#1682',
        'PyroMax#11230',
        'FartMckenzie#1876',
      ];
  }

  ngOnInit(): void {
    this.battleTags.forEach(x => this.loadProfile(x));
  }

  getStats(bt: string): PlayerStats {
    return this.stats.get(bt);
  }

  private loadProfile(bt: string): void {
    this.statsDataService.getProfile(this.platform, this.region, bt).pipe(
      take(1),
      tap(x => this.stats.set(bt, x))
    ).subscribe();
  }
}
