import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatSidenav } from '@angular/material';

import { SidenavService } from '../layouts/services/sidenav.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'devil-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  stickyHeader$: true;
  @ViewChild('sidenav') public sidenav: MatSidenav;
  constructor(private sidenavService: SidenavService) { }

  ngOnInit() {
    this.stickyHeader$ = true;
    this.sidenavService.setSidenav(this.sidenav);
  }

}
