import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user.routes';
import { ListUsersComponent } from './list-users/list-users.component';
import { SharedModule } from '@app/shared';
import { UserService } from './user.service';
import { AddUpdateUserComponent } from './add-update-user/add-update-user.component';

@NgModule({
  imports: [
    UserRoutingModule,
    SharedModule
  ],
  declarations: [
    ListUsersComponent,
    AddUpdateUserComponent,
  ],
  entryComponents: [
    AddUpdateUserComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
