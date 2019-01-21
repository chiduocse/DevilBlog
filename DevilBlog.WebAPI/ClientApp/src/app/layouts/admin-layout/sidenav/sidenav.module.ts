import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { AdminSidenavComponent } from './sidenav.component';
import { SidenavService } from '../../services';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    AdminSidenavComponent
  ],
  providers: [
    SidenavService
  ]
})
export class AdminSidenavModule { }
