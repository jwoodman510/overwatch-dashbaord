import { Injectable } from '@angular/core';

import { BattleTag } from '../models';
import { StorageService } from './storage.service';

@Injectable()
export class BattleTagService {
  private readonly key = 'ovw-bt';

  constructor(private storageService: StorageService) {
    const data = this.get();

    if (!data.length) {
      this.storageService.set(this.key, [
        'woodman#11497:na:pc',
        'woodman#11369:na:pc',
        'JonnyPGood#1682:na:pc',
        'PyroMax#11230:na:pc',
        'FartMckenzie#1876:na:pc'
      ]);
    }
  }

  get(): Array<BattleTag> {
    const keys = this.storageService.get<Array<string>>(this.key) || [];

    return keys.map(key => BattleTag.parseKey(key));
  }

  deleteEntry(bt: BattleTag): void {
    this.set(
      this.get().filter(x => BattleTag.getKey(x) !== BattleTag.getKey(bt))
    );
  }

  addEntry(bt: BattleTag): void {
    this.set(this.get().concat(bt));
  }

  set(data: Array<BattleTag>): void {
    const keys = data.map(x => BattleTag.getKey(x));
    this.storageService.set<Array<string>>(this.key, keys);
  }
}
