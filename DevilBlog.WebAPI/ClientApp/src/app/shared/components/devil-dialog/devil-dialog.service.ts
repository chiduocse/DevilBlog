import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { DevilDialogStateService } from './devil-dialog-state.service';
import { IDevilDialogOptions } from '@app/models';
import { DevilDialogComponent } from './devil-dialog.component';

@Injectable()
export class DevilDialogService {
  constructor(
    private dialog: MatDialog,
    private state: DevilDialogStateService
  ) {}

  public openDialog(
    options: IDevilDialogOptions
  ): MatDialogRef<DevilDialogComponent> {
    this.state.options = options;
    this.state.dialog = this.dialog.open(DevilDialogComponent, {
      data: options,
      disableClose: options.disableClose ? options.disableClose : false
    });
    return this.state.dialog;
  }

  public disableClose() {
    this.state.dialog.disableClose = true;
  }

  public close() {
    this.state.dialog.close();
  }
}
