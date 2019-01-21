import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: LoginComponent, pathMatch: 'full' }
    ])
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
