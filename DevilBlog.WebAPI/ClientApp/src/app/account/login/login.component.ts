import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { AuthService } from '@app/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'devil-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginModel: ILoginModel;
  constructor(public authService: AuthService, private router: Router) {}

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  getErrorMessage() {
    return this.email.hasError('required')
      ? 'You must enter a value'
      : this.email.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  ngOnInit() {}

  public login() {
    this.authService.logIn(this.email.value, this.password.value).then(x => {
      this.router.navigate(['/admin']);
    });
  }
}
