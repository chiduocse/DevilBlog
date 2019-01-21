import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { MatDialog } from '@angular/material';

import { UserService } from '../user.service';
import { User } from '@app/models';
import { AddUpdateUserComponent } from '../add-update-user/add-update-user.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'devil-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  animal: string;
  name: string;

  displayedColumns = ['select', 'fullName', 'userName', 'email'];
  dataSource: MatTableDataSource<User>;
  selection: SelectionModel<User>;
  users: User[];
  constructor(
    public dialog: MatDialog,
    private userService: UserService
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.userService.getUsers().subscribe((res) => {
      this.users = res;
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.selection = new SelectionModel<User>(true, []);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUpdateUserComponent, {
      width: '1280px',
      height: '550px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
