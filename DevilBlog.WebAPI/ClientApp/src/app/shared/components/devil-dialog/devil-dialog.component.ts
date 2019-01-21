import {
  Component,
  OnInit,
  Inject,
  Output,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { IDevilDialogOptions } from '@app/models';
import { DevilDialogStateService } from './devil-dialog-state.service';
import { DevilFormComponent } from '../forms';

@Component({
  selector: 'devil-dialog',
  templateUrl: './devil-dialog.component.html',
  styleUrls: ['./devil-dialog.component.scss']
})
export class DevilDialogComponent implements OnInit, AfterViewInit {
  options: IDevilDialogOptions;
  @ViewChild(DevilFormComponent) devilForm: DevilFormComponent;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDevilDialogOptions,
    private _state: DevilDialogStateService
  ) {
    this.options = _state.options;
  }

  ngOnInit() {}
  ngAfterViewInit() {
    if (this.data.row) {
      this.devilForm.updateForm(this.data.row);
    }
  }

  public cancel() {
    this._state.dialog.close(false);
  }

  public yes($event: Event) {
    // confirm
    if (!this.devilForm) {
      this._state.dialog.close(true);
    } else if (this.devilForm.form.valid) {
      this.data.row = Object.assign(
        {},
        this.data.row,
        this.devilForm.form.value
      );
      this._state.dialog.close(this.data.row);
      this.devilForm.onSubmit($event);
    } else {
      this.devilForm.onSubmit($event);
    }
  }
}
