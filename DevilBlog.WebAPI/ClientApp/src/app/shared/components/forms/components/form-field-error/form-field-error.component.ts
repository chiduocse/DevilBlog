import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { IFieldConfig } from '@app/models';
import { DevilFormComponent } from '../form';

@Component({
  selector: 'devil-form-field-error, [devilFormFieldError]',
  templateUrl: './form-field-error.component.html',
  styleUrls: ['./form-field-error.component.scss']
})
export class FormFieldErrorComponent implements OnInit {
  @Input() public fieldConfig: IFieldConfig;
  constructor(public formComponent: DevilFormComponent) {}

  ngOnInit() {}

  errorMessage(): string {
    // valid || (pristine && !submitted)
    const control: AbstractControl = this.formComponent.form.get(
      this.fieldConfig.name
    );
    if (control) {
      for (const errorCode in control.errors) {
        if (
          control.errors.hasOwnProperty(errorCode) &&
          (control.touched || this.formComponent.submitted)
        ) {
          return this.getErrorText(errorCode);
        }
      }
    }
    return '';
  }

  private getErrorText(code: string) {
    const config: any = {
      required: 'Field is required',
      maxlength: '',
      email: 'Invalid email address',
      telephone: 'Invalid telephone number',
      date: 'Invalid date entered',
      invalidDomain: 'Invalid domain name',
      numberValidator: 'Invalid number',
      numberNotZeroValidator: 'Number greater than 0 required',
      multipleCheckboxRequireAtLeastOne: 'At least one option required',
      multipleCheckboxRequireMoreThanOne: 'More than one options required'
    };
    return (
      (this.fieldConfig.errorMessages &&
        this.fieldConfig.errorMessages[code]) ||
      config[code]
    );
  }
}
