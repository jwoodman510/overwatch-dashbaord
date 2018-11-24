import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';

import { Actions, ofActionErrored, Store } from '@ngxs/store';

import { BattleTag, PlayerStats } from '@app/core/models';
import { RemoveBattleTag } from '@app/core/state';
import { LoadStats, StatsState } from '@app/dashboard/state';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit {
  @Input()
  dashboard: string;

  @Input()
  battleTag: BattleTag;

  get flipped(): boolean {
    return this._flipped;
  }

  get hasError(): boolean {
    return this._hasError;
  }

  get stats(): PlayerStats {
    return this._stats;
  }

  private _flipped = false;
  private _hasError = false;
  private _stats: PlayerStats;

  constructor(
    private store: Store,
    private actions: Actions,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadStats(this.battleTag, false));

    this.actions
      .pipe(
        ofActionErrored(LoadStats),
        filter((x: LoadStats) => x.battleTag === this.battleTag),
        tap(() => (this._hasError = true))
      )
      .subscribe();

    this.store
      .select(StatsState)
      .pipe(
        filter((x: Array<PlayerStats>) => x && x.length > 0),
        map(x =>
          x.find(
            y =>
              BattleTag.getKey(y.battleTag) === BattleTag.getKey(this.battleTag)
          )
        ),
        distinctUntilChanged()
      )
      .subscribe(x => (this._stats = x));
  }

  flip(): void {
    this._flipped = !this._flipped;
  }

  remove(): void {
    this.store.dispatch(new RemoveBattleTag(this.dashboard, this.battleTag));
  }

  reload(): void {
    this._hasError = false;
    this.store.dispatch(new LoadStats(this.battleTag, true));
  }

  get playOverwatchLink(): SafeResourceUrl {
    const platform = this.battleTag.platform.toLowerCase();
    const name = this.battleTag.name.replace('#', '-');

    const url = `https://playoverwatch.com/en-us/career/${platform}/${name}`;

    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
