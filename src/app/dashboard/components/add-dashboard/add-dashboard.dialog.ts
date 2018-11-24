import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Select } from '@ngxs/store';

import { Dashboard } from '@app/core/models';
import { UserState } from '@app/core/state';

@Component({
  selector: 'app-add-dashboard-dialog',
  templateUrl: './add-dashboard.dialog.html',
  styleUrls: ['./add-dashboard.dialog.scss']
})
export class AddDashboardDialogComponent {
  name: string;

  @Select(UserState.dashboards)
  dashboards$: Observable<Array<Dashboard>>;

  constructor(private dialogRef: MatDialogRef<AddDashboardDialogComponent>) {}

  submit(): void {
    this.dialogRef.close(this.name);
  }

  nameExists(): Observable<boolean> {
    return this.dashboards$.pipe(map(x => x.some(y => y.name === this.name)));
  }
}
