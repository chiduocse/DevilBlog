import { IFieldConfig } from '../forms';

export interface IDevilDialogOptions {
  title: string;
  message?: string;
  config?: IFieldConfig[];
  row?: Array<any>;
  disableClose?: boolean;
}
