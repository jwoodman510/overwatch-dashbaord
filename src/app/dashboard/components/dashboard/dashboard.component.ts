import { Component, OnInit, Input } from '@angular/core';
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
  @Input()
  searchText: string;

  readonly stats: Map<string, PlayerStats>;

  private region = Regions.NA;
  private platform = Platforms.PC;
  private battleTags: Array<string>;

  constructor(private statsDataService: StatsDataService) {
      this.stats = new Map<string, PlayerStats>();
      this.battleTags = [
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
      ];
  }

  ngOnInit(): void {
    this.battleTags.forEach(x => this.loadProfile(x));
  }

  getBattleTags(): Array<string> {
    const data = this.searchText
      ? this.battleTags.filter(x => x.toLowerCase().indexOf(this.searchText.toLowerCase()) >= 0)
      : this.battleTags;

    return this.sort(data);
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

  private sort = (data: Array<string>): Array<string> => {
    return data.sort((a, b) => {
      a = a.toLowerCase();
      b = b.toLowerCase();

      return a > b ? 1 : b > a ? -1 : 0;
    });
  }
}
