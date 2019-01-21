import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  LayoutToolbarRoutes,
  LayoutSidenavRoutes,
  LayoutFooterRoutes
} from './index';

@NgModule({
  imports: [
    RouterModule.forChild([
      ...LayoutFooterRoutes,
      ...LayoutToolbarRoutes,
      ...LayoutSidenavRoutes
    ]),
  ],
  exports: [
    RouterModule
  ]
})
export class PublicLayoutRoutingModule { }
