import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-card-dialog',
  templateUrl: './add-card.dialog.html',
  styleUrls: ['./add-card.dialog.scss']
})
export class AddCardDialogComponent {
  platform: Platform = 'pc';
  region: Region = 'na';
  battletag: string;

  private readonly battletagPattern = /^.+#[0-9]+$/;

  constructor(private dialogRef: MatDialogRef<AddCardDialogComponent>) {}

  get valid(): boolean {
    return this.battletag && this.battletag.length && this.battletagPattern.test(this.battletag);
  }

  submit(): void {
    this.dialogRef.close({
      platform: this.platform,
      region: this.region,
      battletag: this.battletag
    });
  }
}
