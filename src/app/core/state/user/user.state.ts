import { Observable, of, throwError } from 'rxjs';

import { Action, Selector, State, StateContext } from '@ngxs/store';

import { Dashboard, User } from '@app/core/models';
import { StorageService, UserService } from '@app/core/services';

import { AddDashboard, LoadUser, SetActiveDashboard } from './user.actions';

@State<User>({
  name: 'user'
})
export class UserState {
  constructor(
    private userService: UserService,
    private storageService: StorageService
  ) {}

  @Selector()
  static dashboards(state: User): Array<Dashboard> {
    return state.dashboards;
  }

  @Selector()
  static activeDashboard(state: User): Dashboard {
    return state.activeDashboard;
  }

  @Action(LoadUser)
  loadUser({ setState }: StateContext<User>): Observable<void> {
    let user = this.userService.get();

    if (!user.dashboards || !user.dashboards.length) {
      this.migrateV1Dashboard();
      user = this.userService.get();
    }

    user.activeDashboard = user.dashboards[0];

    setState(user);

    return of(undefined);
  }

  @Action(AddDashboard)
  addDashboard(
    { dispatch, getState, patchState }: StateContext<User>,
    action: AddDashboard
  ): Observable<void> {
    if (getState().dashboards.some(x => x.name === action.name)) {
      return throwError('conflict');
    }

    const key = this.userService.addDashboard(action.name);

    const dashboard: Dashboard = {
      key,
      name: action.name
    };

    patchState({
      dashboards: getState().dashboards.concat(dashboard)
    });

    return dispatch(new SetActiveDashboard(dashboard));
  }

  @Action(SetActiveDashboard)
  setActiveDashboard(
    { patchState }: StateContext<User>,
    action: SetActiveDashboard
  ): Observable<void> {
    patchState({
      activeDashboard: action.dashboard
    });

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
