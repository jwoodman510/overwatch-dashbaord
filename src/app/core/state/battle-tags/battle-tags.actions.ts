export class LoadBattleTags {
  static readonly type = '[Global] Load BattleTags';
  constructor() {}
}

export class AddBattleTag {
  static readonly type = '[Global] Add BattleTag';
  constructor(public battleTag: string) {}
}

export class RemoveBattleTag {
  static readonly type = '[Global] Remove BattleTag';
  constructor(public battleTag: string) {}
}
