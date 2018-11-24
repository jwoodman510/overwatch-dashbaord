import { Observable, of } from 'rxjs';

import { Action, State, StateContext } from '@ngxs/store';

import { Dashboard, User } from '@app/core/models';
import { StorageService, UserService } from '@app/core/services';

import { LoadUser } from './user.actions';

@State<User>({
  name: 'user'
})
export class UserState {
  constructor(
    private userService: UserService,
    private storageService: StorageService
  ) {}

  @Action(LoadUser)
  loadUser({ setState }: StateContext<User>): Observable<void> {
    let user = this.userService.get();

    if (!user.dashboards || !user.dashboards.length) {
      this.migrateV1Dashboard();
      user = this.userService.get();
    }

    setState(user);

    return of(undefined);
  }

  private migrateV1Dashboard(): void {
    const key = this.userService.addDashboard(Dashboard.defaultName);

    const v1Keys = this.storageService.get<Array<string>>('ovw-bt') || [
      'woodman#11497:na:pc',
      'woodman#11369:na:pc',
      'JonnyPGood#1682:na:pc',
      'PyroMax#11230:na:pc',
      'FartMckenzie#1876:na:pc'
    ];

    this.storageService.set(`d.${key}`, v1Keys);
  }
}
