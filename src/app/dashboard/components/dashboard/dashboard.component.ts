import { Component, OnInit } from '@angular/core';
import { PlayerStats, Environment } from 'src/app/models';
import { StatsDataService } from 'src/app/services';
import { forkJoin } from 'rxjs';
import {take, tap} from 'rxjs/operators';
import { Regions, Platforms } from 'src/app/constants';
import { trigger } from '@angular/animations';

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

  constructor(
    private environment: Environment,
    private statsDataService: StatsDataService) {
      this.stats = new Map<string, PlayerStats>();
      this.battleTags = this.environment.battleTags;
  }

  ngOnInit(): void {
    this.battleTags.forEach(x => this.loadProfile(x));
  }

  isLoaded(bt: string): boolean {
    return this.stats.has(bt);
  }

  getLevel(bt: string): number | string {
    const x = this.stats.get(bt);

    return x ? x.level : 'N/A';
  }

  getRating(bt: string): number | string {
    const x = this.stats.get(bt);

    return x ? x.rating : 'N/A';
  }

  getQpGamesPlayed(bt: string): number | string {
    const x = this.stats.get(bt);

    return x && x.quickPlayStats && x.quickPlayStats.games
      ? x.quickPlayStats.games.played
      : 'N/A';
  }

  getQpGamesWon(bt: string): number | string {
    const x = this.stats.get(bt);

    return x && x.quickPlayStats && x.quickPlayStats.games
      ? x.quickPlayStats.games.won
      : 'N/A';
  }

  getCompGamesPlayed(bt: string): number | string {
    const x = this.stats.get(bt);

    return x && x.competitiveStats && x.competitiveStats.games
      ? x.competitiveStats.games.played
      : 'N/A';
  }

  getCompGamesWon(bt: string): number | string {
    const x = this.stats.get(bt);

    return x.competitiveStats && x.competitiveStats.games
      ? x.competitiveStats.games.won
      : 'N/A';
  }

  private loadProfile(bt: string): void {
    this.statsDataService.getProfile(this.platform, this.region, bt).pipe(
      take(1),
      tap(x => this.stats.set(bt, x))
    ).subscribe();
  }
}
