import { NgModule } from '@angular/core';

import { PublicComponent } from './public.component';
import { PublicRoutingModule } from './public-routing.module';
import { PublicLayoutModule } from '@app/layouts/public-layout';
import { SharedModule } from '@app/shared';
import { SidenavService } from '@app/layouts/services';

@NgModule({
  imports: [SharedModule, PublicRoutingModule, PublicLayoutModule],
  declarations: [PublicComponent],
  providers: [SidenavService]
})
export class PublicModule {}
