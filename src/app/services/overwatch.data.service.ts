import { Injectable } from '@angular/core';
import { Environment, PlayerStats } from '../models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OverwatchDataService {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private environment: Environment) {
    this.baseUrl = `${this.environment.overwatchApi.host}${this.environment.overwatchApi.version}/stats`;
  }

  getStats(platform: Platform, region: Region, battleTag: string): Observable<PlayerStats> {
    return this.http.get<PlayerStats>(`${this.baseUrl}/${platform}/${region}/${battleTag}`);
  }
}
