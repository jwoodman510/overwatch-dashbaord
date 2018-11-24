import { Dashboard } from '@app/core/models';

export class LoadUser {
  static readonly type = '[Global] Load User';
  constructor() {}
}

export class AddDashboard {
  static readonly type = '[Global] Add Dashboard';
  constructor(public name: string) {}
}

export class SetActiveDashboard {
  static readonly type = '[Global] Set Active Dashboard';
  constructor(public dashboard: Dashboard) {}
}
