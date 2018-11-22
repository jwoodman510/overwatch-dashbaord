import { Observable, of } from 'rxjs';

import { Action, State, StateContext } from '@ngxs/store';

import { BattleTagService } from '@app/core/services';

import {
  AddBattleTag,
  LoadBattleTags,
  RemoveBattleTag
} from './battle-tags.actions';

@State<Array<string>>({
  name: 'battleTags',
  defaults: []
})
export class BattleTagsState {
  constructor(private battleTagService: BattleTagService) {}

  @Action(LoadBattleTags)
  loadBattleTags({ setState }: StateContext<Array<string>>): Observable<void> {
    setState(this.battleTagService.get());

    return of(undefined);
  }

  @Action(AddBattleTag)
  addBattleTag(
    { getState, setState }: StateContext<Array<string>>,
    action: AddBattleTag
  ): Observable<void> {
    const state = getState();

    if (!state.some(x => x.toLowerCase() === action.battleTag.toLowerCase())) {
      this.battleTagService.addEntry(action.battleTag);

      setState(state.concat(action.battleTag));
    }

    return of(undefined);
  }

  @Action(RemoveBattleTag)
  removeBattleTag(
    { getState, setState }: StateContext<Array<string>>,
    action: RemoveBattleTag
  ): Observable<void> {
    const state = getState().filter(
      x => x.toLowerCase() === action.battleTag.toLowerCase()
    );

    this.battleTagService.deleteEntry(action.battleTag);

    setState(state);

    return of(undefined);
  }
}
