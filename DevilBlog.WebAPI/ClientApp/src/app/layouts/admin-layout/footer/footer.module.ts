import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { AdminFooterComponent } from './footer.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    AdminFooterComponent
  ],
  exports: [
    AdminFooterComponent
  ]
})
export class AdminFooterModule { }
