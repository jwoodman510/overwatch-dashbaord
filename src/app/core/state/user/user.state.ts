import { Observable, of, throwError } from 'rxjs';

import { Action, Selector, State, StateContext } from '@ngxs/store';

import { Dashboard, User } from '@app/core/models';
import { StorageService, UserService } from '@app/core/services';

import {
  AddDashboard,
  DeleteDashboard,
  LoadUser,
  SetActiveDashboard,
  UpdateDashboard
} from './user.actions';

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

    user.activeDashboard = user.dashboards.find(x => x.isDefault);

    if (!user.activeDashboard) {
      const defaultDashboard = user.dashboards[0];
      defaultDashboard.isDefault = true;
      this.userService.updateDashboard(defaultDashboard);

      user = this.userService.get();
      user.activeDashboard = defaultDashboard;
    }

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
      name: action.name,
      isDefault: action.isDefault
    };

    if (dashboard.isDefault) {
      getState().dashboards.forEach(x => {
        x.isDefault = false;
        this.userService.updateDashboard(x);
      });
    }

    patchState({
      dashboards: getState().dashboards.concat(dashboard)
    });

    return dispatch(new SetActiveDashboard(dashboard));
  }

  @Action(UpdateDashboard)
  updateDashboard(
    { getState, patchState }: StateContext<User>,
    action: UpdateDashboard
  ): Observable<void> {
    if (
      getState()
        .dashboards.filter(x => x.key !== action.dashboard.key)
        .some(x => x.name === action.dashboard.name)
    ) {
      return throwError('conflict');
    }

    const state = getState();
    const index = state.dashboards.findIndex(
      x => x.key === action.dashboard.key
    );

    if (index >= 0) {
      if (action.dashboard.isDefault) {
        state.dashboards
          .filter(x => x.key !== action.dashboard.key)
          .forEach(x => {
            x.isDefault = false;
            this.userService.updateDashboard(x);
          });
      }

      this.userService.updateDashboard(action.dashboard);

      patchState({
        dashboards: state.dashboards
      });

      if (state.activeDashboard.key === action.dashboard.key) {
        patchState({
          activeDashboard: action.dashboard
        });
      }
    }

    return of(undefined);
  }

  @Action(DeleteDashboard)
  deleteDashboard(
    { getState, patchState }: StateContext<User>,
    action: DeleteDashboard
  ): Observable<void> {
    const state = getState();
    const dashboards = state.dashboards.filter(
      x => x.key !== action.dashboard.key
    );

    if (dashboards.length === 0) {
      return throwError('At least one dashboard is required.');
    }

    this.userService.removeDashboard(action.dashboard.key);

    patchState({ dashboards });

    if (
      state.activeDashboard &&
      state.activeDashboard.key === action.dashboard.key
    ) {
      patchState({
        activeDashboard: dashboards[0]
      });
    }

    return of(undefined);
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

    this.userService.updateDashboard({
      key,
      name: Dashboard.defaultName,
      isDefault: true
    });

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
