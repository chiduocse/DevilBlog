import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '@app/shared';

import { SidenavService } from '@app/layouts/services';
import { AdminLayoutModule } from '@app/layouts/admin-layout';

@NgModule({
  imports: [SharedModule, AdminRoutingModule, AdminLayoutModule],
  declarations: [AdminComponent],
  providers: [SidenavService]
})
export class AdminModule {}
