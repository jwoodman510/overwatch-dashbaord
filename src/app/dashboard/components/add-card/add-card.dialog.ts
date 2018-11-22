import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { BattleTag } from '@app/core/models';

@Component({
  selector: 'app-add-card-dialog',
  templateUrl: './add-card.dialog.html',
  styleUrls: ['./add-card.dialog.scss']
})
export class AddCardDialogComponent {
  platform: Platform = 'pc';
  region: Region = 'na';
  battleTag: string;

  private readonly battleTagPattern = /^.+#[0-9]+$/;

  constructor(private dialogRef: MatDialogRef<AddCardDialogComponent>) {}

  get valid(): boolean {
    return (
      this.battleTag &&
      this.battleTag.length &&
      this.battleTagPattern.test(this.battleTag)
    );
  }

  submit(): void {
    this.dialogRef.close({
      platform: this.platform,
      region: this.region,
      name: this.battleTag
    } as BattleTag);
  }
}
