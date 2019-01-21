import { NgModule } from '@angular/core';


import { SharedModule } from '@app/shared';
import { AdminToolbarComponent } from './toolbar.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    AdminToolbarComponent
  ],
  exports: [
    AdminToolbarComponent
  ]
})
export class AdminToolbarModule { }
