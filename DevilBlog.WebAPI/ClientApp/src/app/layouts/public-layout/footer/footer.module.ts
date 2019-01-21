import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { FooterComponent } from './footer.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    FooterComponent
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }
