import {
  Component,
  OnChanges,
  ViewChild,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { IDevilTableOptions, IFieldConfig } from '@app/models';
import { DevilDialogService } from '../devil-dialog';

@Component({
  selector: 'devil-table',
  templateUrl: './devil-table.component.html',
  styleUrls: ['./devil-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevilTableComponent implements OnChanges {
  @Input() options: IDevilTableOptions<any>;
  @Output('checkedBox') checkedBoxClickEvent = new EventEmitter<any[]>();
  @Output('edit') editClickEvent = new EventEmitter<any>();
  @Output('delete') deleteClickEvent = new EventEmitter<any[]>();
  @Output('multipleDelete') multipleDeleteClickEvent = new EventEmitter<
    any[]
  >();
  @Output('addNew') addNewEvent = new EventEmitter();
  @Output('addOrUpdate') addOrUpdateEvent = new EventEmitter<any[]>();

  dataSource: MatTableDataSource<any>;
  selection: SelectionModel<any>;
  isLoadingResults = true;
  isRateLimitReached = false;
  pageSizeDefault: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _cd: ChangeDetectorRef,
    private dialogService: DevilDialogService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.options) {
      if (this.options === undefined) {
        return;
      } else {
        this._setData(changes.options.currentValue);
      }
    }
  }

  private _setData(options: IDevilTableOptions<any>) {
    this.isLoadingResults = true;
    this.dataSource = new MatTableDataSource(options.dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.selection = new SelectionModel<any>(true, []);

    if (!options.disableCheckBox) {
      options.displayedColumns.unshift('select');
    }

    if (options.disableEditing) {
      options.displayedColumns.push('star');
    }

    if (this.options.pageSizeDefault) {
      this.pageSizeDefault = this.options.pageSizeDefault;
      this.dataSource.paginator._changePageSize(this.options.pageSizeDefault);
    } else if (this.options.pageSizeOptions) {
      this.pageSizeDefault = this.options.pageSizeOptions[0];
      this.dataSource.paginator._changePageSize(this.pageSizeDefault);
    } else {
      this.pageSizeDefault = 5;
      this.dataSource.paginator._changePageSize(this.pageSizeDefault);
    }

    this.isLoadingResults = false;
  }

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  public addNew($event: Event) {
    $event.stopPropagation();
    this.addNewEvent.emit();
    this._createOrEdit();
  }

  public checkBoxClick($event: Event, row: any) {
    this.checkedBoxClickEvent.emit(row);

    $event.stopPropagation();
  }

  public editClick(element: any, index: number) {
    this._createOrEdit(element, index);
    this.editClickEvent.emit({ element: element, index: index });
  }

  public deleteClick(element: any, index: number) {
    const message = 'Are you sure you want to delete this data?';
    const dialog = this.dialogService.openDialog({
      title: 'Delete',
      message,
      disableClose: true
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.deleteClickEvent.emit(element);
        if (index === 0) {
          if (
            this.dataSource.paginator.pageIndex ===
            this.dataSource.paginator.getNumberOfPages()
          ) {
            if (
              this.dataSource.paginator.pageIndex *
                this.dataSource.paginator.pageSize +
                1 ===
              this.dataSource.data.length
            ) {
              this.dataSource.paginator.previousPage();
            }
          }
        }
        this._cd.markForCheck();
      }
    });
  }

  public multipleDelete() {
    this.multipleDeleteClickEvent.emit(this.selection.selected);
  }

  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  public masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  private _createOrEdit(row = null, rowIndex = null) {
    const title = row ? 'Update' : 'Create';
    const config = this.options.columns
      .filter(f => f.fieldType)
      .map(x => {
        const field: IFieldConfig = {
          name: x.columnsDef.toString(),
          type: x.fieldType,
          label: x.headerCell,
          validation: x.fieldValidations,
          options: x.fieldOptions
        };
        return field;
      });

    const dialog = this.dialogService.openDialog({
      title,
      config,
      disableClose: true,
      row
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.addOrUpdateEvent.emit(result);
      }
    });
  }
}
