import { BattleTag } from '@app/core/models';

export class LoadBattleTags {
  static readonly type = '[Global] Load BattleTags';
  constructor(public dashboard: string) {}
}

export class AddBattleTag {
  static readonly type = '[Global] Add BattleTag';
  constructor(public dashboard: string, public battleTag: BattleTag) {}
}

export class RemoveBattleTag {
  static readonly type = '[Global] Remove BattleTag';
  constructor(public dashboard: string, public battleTag: BattleTag) {}
}
