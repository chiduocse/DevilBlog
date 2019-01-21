import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field, IFieldConfig } from '@app/models';
import { DevilFormComponent } from '../form';

@Injectable()
export abstract class FieldBaseComponent implements Field {
  config: IFieldConfig;
  constructor(public fc: DevilFormComponent) {}

  get formGroup(): FormGroup {
    return this.fc.form;
  }
}
