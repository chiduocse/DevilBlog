import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'devil-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  logo = require('../../../../assets/images/devil-logo.png');
  constructor(private sidenavService: SidenavService) { }

  ngOnInit() {
  }

  public toggleSidenav() {
    this.sidenavService.toggle().then(() => { });
  }

}
