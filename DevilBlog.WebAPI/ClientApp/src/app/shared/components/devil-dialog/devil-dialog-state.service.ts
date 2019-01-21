import { Injectable, TemplateRef } from '@angular/core';

import { IDevilDialogOptions } from '@app/models';
import { MatDialogRef } from '@angular/material/dialog';

@Injectable()
export class DevilDialogStateService {
  options: IDevilDialogOptions;

  dialog: MatDialogRef<any>;

  template: TemplateRef<any>;
}
