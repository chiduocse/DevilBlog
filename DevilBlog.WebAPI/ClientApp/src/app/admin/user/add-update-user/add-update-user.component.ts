import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, NgForm } from '@angular/forms';
import { DataService } from '@app/core';
import { Role, User } from '@app/models';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'devil-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.scss']
})

export class AddUpdateUserComponent implements OnInit {
  hide = true;
  hide1 = true;
  public user: User;
  patternUsername = /^[a-zA-Z0-9_-]{5,50}$/;
  patternPassword = /^(?=^.{8,50}$)((?=.*\d)(?=.*\W+))(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
  constructor(
    private dataServices: DataService,
    public dialogRef: MatDialogRef<AddUpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  public rolesData: any;

  rolesControl = new FormControl();

  roleslist: any;

  ngOnInit() {
    this.user = new User();
    this.getRoles();
  }

  getRoles() {
    this.dataServices.get<Role[]>('api/role').subscribe(roles => {
      this.rolesData = roles;
      this.roleslist = roles;
    }, error => {
      console.log(error);
    });
  }

  onNoClick(): void {
    console.log(this.rolesControl.value);
    this.dialogRef.close();
  }

  avatarChange(event) {
    console.log(event);
  }

  save(form: NgForm) {
    console.log(this.user);
    if (form.valid) {
      this.user.roles = this.rolesControl.value;
      console.log(this.user);
    }
  }
}
