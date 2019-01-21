import { Component, OnInit } from '@angular/core';
import { Ifooter } from './interfaces/index';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'devil-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class AdminFooterComponent implements OnInit {

  // public version = require('../../../../package.json').version;
  public version = '1.0.0';
  constructor() { }

  public links: Ifooter[] = [
    {
      name: 'Github',
      url: 'https://github.com/chiduocse/DevilBlog',
      icon: 'web'
    },
    {
      name: 'Issues',
      url: 'https://github.com/chiduocse/DevilBlog/issues',
      icon: 'bug_report'
    },
    {
      name: 'ChiduocSE',
      url: 'https://github.com/chiduocse',
      icon: 'person'
    },
  ];
  ngOnInit() {
  }
}
