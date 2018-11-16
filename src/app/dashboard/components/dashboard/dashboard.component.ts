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

  getPlayerIcon(bt: string): string {
    const x = this.stats.get(bt);

    return x ? x.icon : undefined;
  }

  getRatingIcon(bt: string): string {
    const x = this.stats.get(bt);

    return x ? x.ratingIcon : undefined;
  }

  getEndorsementIcon(bt: string): string {
    const x = this.stats.get(bt);

    return x ? x.endorsementIcon : undefined;
  }

  getPrestigeIcon(bt: string): string {
    const x = this.stats.get(bt);

    return x ? x.prestigeIcon : undefined;
  }

  getLevel(bt: string): number | string {
    const x = this.stats.get(bt);

    return x ? x.level : 'N/A';
  }

  getEndorsementLevel(bt: string): number | string {
    const x = this.stats.get(bt);

    return x ? x.endorsement : 'N/A';
  }

  getRating(bt: string): number | string {
    const x = this.stats.get(bt);

    return x ? x.rating : 'N/A';
  }

  getQpGamesPlayed(bt: string): number {
    const x = this.stats.get(bt);

    return x && x.quickPlayStats && x.quickPlayStats.games
      ? x.quickPlayStats.games.played
      : 0;
  }

  getQpGamesWon(bt: string): number {
    const x = this.stats.get(bt);

    return x && x.quickPlayStats && x.quickPlayStats.games
      ? x.quickPlayStats.games.won
      : 0;
  }

  getCompGamesPlayed(bt: string): number {
    const x = this.stats.get(bt);

    return x && x.competitiveStats && x.competitiveStats.games
      ? x.competitiveStats.games.played
      : 0;
  }

  getCompGamesWon(bt: string): number {
    const x = this.stats.get(bt);

    return x.competitiveStats && x.competitiveStats.games
      ? x.competitiveStats.games.won
      : 0;
  }

  private loadProfile(bt: string): void {
    this.statsDataService.getProfile(this.platform, this.region, bt).pipe(
      take(1),
      tap(x => this.stats.set(bt, x))
    ).subscribe();
  }
}
