import { Injectable } from '@angular/core';

import { Dashboard, User } from '../models';
import { StorageService } from './storage.service';

@Injectable()
export class UserService {
  private readonly dashboardsKey = 'dashboards';

  constructor(private storageService: StorageService) {}

  get(): User {
    return {
      dashboards: this.storageService.get<Array<Dashboard>>(this.dashboardsKey)
    };
  }

  addDashboard(name: string): string {
    const dashboards =
      this.storageService.get<Array<Dashboard>>(this.dashboardsKey) || [];

    const key =
      name === Dashboard.defaultName
        ? Dashboard.defaultName
        : this.getHashKey(name).toString();

    dashboards.push({
      key,
      name
    });

    this.storageService.set(this.dashboardsKey, dashboards);

    return key;
  }

  updateDashboard(dashboard: Dashboard): void {
    const dashboards =
      this.storageService.get<Array<Dashboard>>(this.dashboardsKey) || [];

    const index = dashboards.findIndex(x => x.key === dashboard.key);

    if (index >= 0) {
      dashboards[index].name = dashboard.name;

      if (dashboard.isDefault) {
        dashboards.forEach(x => (x.isDefault = false));
      }

      dashboards[index].isDefault = dashboard.isDefault;

      this.storageService.set(this.dashboardsKey, dashboards);
    }
  }

  removeDashboard(key: string): void {
    const dashboards = this.storageService
      .get<Array<Dashboard>>(this.dashboardsKey)
      .filter(x => x.key !== key);

    this.storageService.set(this.dashboardsKey, dashboards);
  }

  private getHashKey(name: string) {
    let hash = 0,
      i,
      chr;

    if (name.length === 0) {
      return hash;
    }

    for (i = 0; i < name.length; i++) {
      chr = name.charCodeAt(i);
      // tslint:disable-next-line:no-bitwise
      hash = (hash << 5) - hash + chr;
      // tslint:disable-next-line:no-bitwise
      hash |= 0;
    }
    return hash;
  }
}
