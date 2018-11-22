import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

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
          'woodman#11497',
          'woodman#11369',
          'JonnyPGood#1682',
          'PyroMax#11230',
          'FartMckenzie#1876',
          'hannah#12408',
          'KyleFresco#2795',
          'KyleFresco#11192',
          'MillaTime#11186',
          'MillaTime#11829'
        ]),
        this.ttl
      );
    }
  }

  get(): Array<string> {
    const cookieVal = this.cookieService.get(this.key);

    return cookieVal && cookieVal.length
      ? (JSON.parse(cookieVal) as Array<string>)
      : [];
  }

  deleteEntry(bt: string): void {
    const data = this.get().filter(x => x !== bt);
    const json = JSON.stringify(data);
    this.cookieService.set(this.key, json, this.ttl);
  }

  addEntry(bt: string): void {
    const data = this.get().concat(bt);
    const json = JSON.stringify(data);
    this.cookieService.set(this.key, json, this.ttl);
  }
}
