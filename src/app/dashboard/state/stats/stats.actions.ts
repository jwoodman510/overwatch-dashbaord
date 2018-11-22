import { BattleTag } from '@app/core/models';

export class LoadStats {
  static readonly type = '[Dashboard] Load Stats';
  constructor(public battleTag: BattleTag) {}
}

export class RemoveStats {
  static readonly type = '[Dashboard] Remove Stats';
  constructor(public battleTag: BattleTag) {}
}
