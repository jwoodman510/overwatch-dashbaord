import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { BattleTag } from '../models';

@Injectable()
export class BattleTagService {
  private readonly ttl: Date;
  private readonly key = 'ovw-bt';

  constructor(private cookieService: CookieService) {
    this.ttl = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

    const data = this.get();

    if (!data.length) {
      this.cookieService.set(
        this.key,
        JSON.stringify([
          'woodman#11497:na:pc',
          'woodman#11369:na:pc',
          'JonnyPGood#1682:na:pc',
          'PyroMax#11230:na:pc',
          'FartMckenzie#1876:na:pc'
        ]),
        this.ttl
      );
    }
  }

  get(): Array<BattleTag> {
    const cookie = this.cookieService.get(this.key);

    const keys =
      cookie && cookie.length ? (JSON.parse(cookie) as Array<string>) : [];

    return keys.map(key => BattleTag.parseKey(key));
  }

  deleteEntry(bt: BattleTag): void {
    this.setCookie(
      this.get().filter(x => BattleTag.getKey(x) !== BattleTag.getKey(bt))
    );
  }

  addEntry(bt: BattleTag): void {
    this.setCookie(this.get().concat(bt));
  }

  private setCookie(data: Array<BattleTag>): void {
    const keys = data.map(x => BattleTag.getKey(x));
    const json = JSON.stringify(keys);
    this.cookieService.set(this.key, json, this.ttl);
  }
}
