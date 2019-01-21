import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared';

import { RegisterComponent } from './register';
import { RegisterConfirmationComponent } from './confirmation';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: RegisterComponent },
      { path: 'registerconfirmation', component: RegisterConfirmationComponent }
    ])
  ],
  declarations: [RegisterComponent, RegisterConfirmationComponent]
})
export class RegisterModule { }
