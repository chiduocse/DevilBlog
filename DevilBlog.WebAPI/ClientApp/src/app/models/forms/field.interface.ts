import { ValidatorFn } from '@angular/forms';

export interface IOption {
  key: string | number;
  value: string;
  selected?: boolean;
}

export enum FieldTypes {
  Textbox = 'input',
  FileUpload = 'file',
  Password = 'password',
  Email = 'email',
  Number = 'number',
  Date = 'date',
  Time = 'time',
  Textarea = 'textarea',
  Radio = 'radio',
  Select = 'select',
  Checkbox = 'checkbox',
  Checkboxlist = 'checkboxlist',
  Button = 'button'
}

export interface Field {
  config: IFieldConfig;
}
export interface IFieldConfig {
  name: string;
  label?: string;
  disabled?: boolean;
  multiple?: boolean;
  options?: IOption[];
  placeholder?: string;
  type: FieldTypes;
  validation?: ValidatorFn[];
  value?: any;
  onSubmit?: Function;
  errorMessages?: Object;
  icon?: string;
}

