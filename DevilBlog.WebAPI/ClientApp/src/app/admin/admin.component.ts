import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatSidenav } from '@angular/material';

import { SidenavService } from '@app/layouts/services';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'devil-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  @ViewChild('sidenav') public sidenav: MatSidenav;
  mode = new FormControl('over');
  constructor(private sidenavService: SidenavService) { }

  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }
}
