import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { SidenavComponent } from './sidenav.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    SidenavComponent
  ],
  exports: [SidenavComponent]
})
export class SidenavModule { }
