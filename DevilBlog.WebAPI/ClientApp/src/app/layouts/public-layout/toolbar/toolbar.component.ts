import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'devil-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'devil-toolbar'
  }
})
export class ToolbarComponent implements OnInit {
  logo = require('../../../../assets/images/devil.png');
  constructor(private sidenavService: SidenavService) {}
  mode = new FormControl('push');
  ngOnInit() {}
  public toggleSidenav() {
    this.sidenavService.toggle().then(() => {});
  }
}
