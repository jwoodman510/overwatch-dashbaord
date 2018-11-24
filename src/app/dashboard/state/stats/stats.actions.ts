import { BattleTag } from '@app/core/models';

export class LoadStats {
  static readonly type = '[Dashboard] Load Stats';
  constructor(public battleTag: BattleTag, public deep: boolean) {}
}
