import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ToolbarComponent
  ],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }
