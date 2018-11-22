import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Environment, PlayerStats } from '../models';

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
  ): Observable<PlayerStats | undefined> {
    return this.http.get<PlayerStats>(
      `${this.baseUrl}${platform}/${region}/${battleTag.replace('#', '-')}`
    );
  }
}
