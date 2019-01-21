import { Injectable } from '@angular/core';
import { NgForm, FormGroup, AbstractControl, FormArray } from '@angular/forms';

import { IFieldConfig } from '@app/models';

@Injectable()
export class FormsService {
  constructor() {}

  valid(form: FormGroup, fieldConfig: IFieldConfig, formRef: NgForm) {
    if (form.controls[fieldConfig.name]) {
      const valid =
        form.controls[fieldConfig.name].valid &&
        (form.controls[fieldConfig.name].touched || formRef.submitted);
      return valid;
    }
  }

  invalid(form: FormGroup, fieldConfig: IFieldConfig, formRef: NgForm) {
    return (
      !form.controls[fieldConfig.name].valid &&
      (form.controls[fieldConfig.name].touched || formRef.submitted)
    );
  }

  dateValidator(control: AbstractControl) {
    if (control.value) {
      const date = new Date(control.value);
      const valid = date instanceof Date && !isNaN(date.valueOf());
      return valid ? undefined : { date: true };
    }
    return { date: true };
  }
}
