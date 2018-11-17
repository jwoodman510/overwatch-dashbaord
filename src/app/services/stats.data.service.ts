import { Injectable } from '@angular/core';
import { Environment, PlayerStats } from '../models';
import { Observable } from 'rxjs';
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

    return this.http.get<any>(`${this.baseUrl}${platform}/${region}/${bt}`).pipe(
      catchError(() => this.http.get<any>(`https://ow-api.com/v1/stats/${platform}/${region}/${bt}/profile`)),
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
