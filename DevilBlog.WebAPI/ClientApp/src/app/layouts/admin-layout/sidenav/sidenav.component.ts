import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SidenavService } from '../../services';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'devil-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class AdminSidenavComponent implements OnInit {

  constructor(private sidenavService: SidenavService) { }

  mode = new FormControl('over');
  ngOnInit() {
  }
  public toggleSidenav() {
    this.sidenavService.toggle().then(() => { });
  }

}
