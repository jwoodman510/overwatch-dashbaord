import { Injectable } from '@angular/core';
import { Environment, PlayerStats } from '../models';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable()
export class StatsDataService {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private environment: Environment) {
    this.baseUrl = `${this.environment.overwatchApi.host}stats/`;
  }

  getProfile(platform: Platform, region: Region, battleTag: string): Observable<PlayerStats> {
    const bt = battleTag.replace('#', '-');
    const fallbackUrl = `https://ow-api.com/v1/stats/${platform}/${region}/${bt}/profile`;

    const loadData$ = this.environment.overwatchApi.enabled
      ? this.http.get<any>(`${this.baseUrl}${platform}/${region}/${bt}`)
      : this.http.get<any>(fallbackUrl);

    return loadData$.pipe(
      catchError(e => this.environment.overwatchApi.enabled ? this.http.get<any>(fallbackUrl) : throwError(e)),
      map(x => x.error && x.error === 'Player not found' ? undefined : x as PlayerStats),
      tap(x => {
        if (x) {
          x.region = region;
          x.platform = platform;
        }
      })
    );
  }
}
