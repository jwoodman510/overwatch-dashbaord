import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Action, State, StateContext } from '@ngxs/store';

import { BattleTag, PlayerStats } from '@app/core/models';
import { StatsDataService } from '@app/dashboard/services';

import { LoadStats } from './stats.actions';

@State<Array<PlayerStats>>({
  name: 'stats',
  defaults: []
})
export class StatsState {
  constructor(private statsDataService: StatsDataService) {}

  @Action(LoadStats)
  loadStats(
    { getState, setState }: StateContext<Array<PlayerStats>>,
    action: LoadStats
  ): Observable<any> {
    const key = BattleTag.getKey(action.battleTag);

    if (!action.deep && getState().find(x => BattleTag.getKey(x) === key)) {
      return of(undefined);
    }

    return this.statsDataService
      .getProfile(
        action.battleTag.platform,
        action.battleTag.region,
        action.battleTag.name
      )
      .pipe(
        tap(x => (x.battleTag = action.battleTag)),
        map(x => getState().concat(x)),
        tap(x => setState(x))
      );
  }
}
