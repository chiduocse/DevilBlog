import { FieldTypes, IOption } from '../forms';
import { ValidatorFn } from '@angular/forms';


export interface IDevilColumnOptions {
  columnsDef: string;
  headerCell: string;
  fieldType?: FieldTypes;
  fieldOptions?: IOption[];
  fieldValidations?: ValidatorFn[];
}
export interface IDevilTableOptions<T> {
  title?: string;
  dataSource?: Array<T>;
  columns?: IDevilColumnOptions[];
  displayedColumns?: string[];
  disableCheckBox?: boolean;
  add_icon?: string;
  add_toolTip?: string;
  disableEditing?: boolean;
  sortHeader?: boolean;
  filter?: boolean;
  pageSizeDefault?: number;
  pageSizeOptions?: Array<number>;
  showFirstLastButtons?: boolean;
}
