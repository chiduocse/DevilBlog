import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SidenavService } from '@app/layouts/services';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'devil-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class AdminToolbarComponent implements OnInit {

  constructor(private sidenavService: SidenavService) { }
  mode = new FormControl('push');
  ngOnInit() {
  }
  public toggleSidenav() {
    this.sidenavService.toggle().then(() => { });
  }

}
