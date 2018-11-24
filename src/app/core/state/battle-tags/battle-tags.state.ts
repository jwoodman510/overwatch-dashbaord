import { Observable, of } from 'rxjs';

import { Action, State, StateContext } from '@ngxs/store';

import { BattleTag } from '@app/core/models';
import { BattleTagService } from '@app/core/services';

import {
  AddBattleTag,
  LoadBattleTags,
  RemoveBattleTag
} from './battle-tags.actions';

@State<Array<BattleTag>>({
  name: 'battleTags',
  defaults: []
})
export class BattleTagsState {
  constructor(private battleTagService: BattleTagService) {}

  @Action(LoadBattleTags)
  loadBattleTags(
    { setState }: StateContext<Array<BattleTag>>,
    action: LoadBattleTags
  ): Observable<void> {
    setState(this.battleTagService.get(action.dashboard));

    return of(undefined);
  }

  @Action(AddBattleTag)
  addBattleTag(
    { getState, setState }: StateContext<Array<BattleTag>>,
    action: AddBattleTag
  ): Observable<void> {
    const state = getState();

    if (
      !state.some(
        x => BattleTag.getKey(x) === BattleTag.getKey(action.battleTag)
      )
    ) {
      this.battleTagService.addEntry(action.dashboard, action.battleTag);

      setState(state.concat(action.battleTag));
    }

    return of(undefined);
  }

  @Action(RemoveBattleTag)
  removeBattleTag(
    { getState, setState }: StateContext<Array<BattleTag>>,
    action: RemoveBattleTag
  ): Observable<void> {
    const state = getState().filter(
      x => BattleTag.getKey(x) !== BattleTag.getKey(action.battleTag)
    );

    this.battleTagService.deleteEntry(action.dashboard, action.battleTag);

    setState(state);

    return of(undefined);
  }
}
