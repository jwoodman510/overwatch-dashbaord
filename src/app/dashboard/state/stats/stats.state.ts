import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Action, State, StateContext } from '@ngxs/store';

import { PlayerStats } from '@app/core/models';
import { StatsDataService } from '@app/dashboard/services';

import { LoadStats, RemoveStats } from './stats.actions';

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
    return this.statsDataService
      .getProfile(
        action.battleTag.platform,
        action.battleTag.region,
        action.battleTag.name
      )
      .pipe(
        map(x => getState().concat(x)),
        tap(x => setState(x))
      );
  }

  @Action(RemoveStats)
  removeStats(
    { getState, setState }: StateContext<Array<PlayerStats>>,
    action: RemoveStats
  ): Observable<void> {
    const state = getState().filter(
      x =>
        x.name === action.battleTag.name &&
        x.region === action.battleTag.region &&
        x.platform === action.battleTag.platform
    );

    setState(state);

    return of(undefined);
  }
}
