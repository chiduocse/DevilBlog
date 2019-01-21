import { NgModule } from '@angular/core';

import { AdminSidenavModule } from './sidenav';
import { AdminToolbarModule } from './toolbar';
import { AdminFooterModule } from './footer';

@NgModule({
  imports: [AdminToolbarModule, AdminSidenavModule, AdminFooterModule],
  declarations: []
})
export class AdminLayoutModule {}
