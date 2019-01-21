import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicComponent } from './public.component';
import {
  LayoutFooterRoutes,
  LayoutToolbarRoutes,
  LayoutSidenavRoutes
} from '../layouts/public-layout';

const routesPublic: Routes = [
  {
    path: '', component: PublicComponent, children: [
      ...LayoutFooterRoutes,
      ...LayoutToolbarRoutes,
      ...LayoutSidenavRoutes,
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: './home/home.module#HomeModule' },
      { path: 'register', loadChildren: '../account/register/register.module#RegisterModule' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routesPublic)
  ],
  exports: [
    RouterModule
  ]
})
export class PublicRoutingModule { }
