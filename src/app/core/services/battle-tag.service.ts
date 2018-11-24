import { Injectable } from '@angular/core';

import { BattleTag } from '../models';
import { StorageService } from './storage.service';

@Injectable()
export class BattleTagService {
  constructor(private storageService: StorageService) {}

  get(dashboard: string): Array<BattleTag> {
    const keys = this.storageService.get<Array<string>>(`d.${dashboard}`) || [];

    return keys.map(key => BattleTag.parseKey(key));
  }

  deleteEntry(dashboard: string, bt: BattleTag): void {
    this.set(
      dashboard,
      this.get(dashboard).filter(
        x => BattleTag.getKey(x) !== BattleTag.getKey(bt)
      )
    );
  }

  addEntry(dashboard: string, bt: BattleTag): void {
    this.set(dashboard, this.get(dashboard).concat(bt));
  }

  set(dashboard: string, data: Array<BattleTag>): void {
    const keys = data.map(x => BattleTag.getKey(x));
    this.storageService.set<Array<string>>(`d.${dashboard}`, keys);
  }
}
