import { Component, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';

import { LoadBattleTags } from './core/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  readonly title = 'overwatch-dashboard';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadBattleTags());
  }
}
