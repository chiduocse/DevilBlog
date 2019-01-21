import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Register } from '@app/models';
import { DataService } from '@app/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'devil-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  hide1 = true;
  public user: Register;
  patternUsername = /^[a-zA-Z0-9_-]{5,50}$/;
  patternPassword = /^(?=^.{8,50}$)((?=.*\d)(?=.*\W+))(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.user = new Register();
  }
  public save(form: NgForm) {
    if (form.valid) {
      this.dataService.post('api/account/register', this.user)
        .subscribe(() => {
          this.router.navigate(['../home'], { relativeTo: this.route });
        });
    }
    console.log(form);
    console.log(this.user);
  }
}
