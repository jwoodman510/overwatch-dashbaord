import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Environment, PlayerStats } from '@app/core/models';

@Injectable()
export class StatsDataService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient, private environment: Environment) {
    this.baseUrl = `${this.environment.overwatchApi.host}stats/`;
  }

  getProfile(
    platform: Platform,
    region: Region,
    battleTag: string
  ): Observable<PlayerStats> {
    return this.http
      .get<PlayerStats>(
        `${this.baseUrl}${platform}/${region}/${battleTag.replace('#', '-')}`
      )
      .pipe(
        tap((x: PlayerStats) => (x.name = battleTag)),
        tap(x => (x.region = region)),
        tap(x => (x.platform = platform))
      );
  }
}
