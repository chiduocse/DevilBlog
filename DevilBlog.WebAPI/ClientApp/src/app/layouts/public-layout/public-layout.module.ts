import { NgModule } from '@angular/core';

import { SidenavModule } from './sidenav/sidenav.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { FooterModule } from './footer/footer.module';

@NgModule({
  imports: [
    FooterModule,
    ToolbarModule,
    SidenavModule
    // PublicLayoutRoutingModule
  ],
  exports: [SidenavModule]
})
export class PublicLayoutModule {}
