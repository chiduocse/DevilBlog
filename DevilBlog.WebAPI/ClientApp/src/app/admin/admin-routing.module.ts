import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import {
  LayoutAdminToolbarRoutes,
  LayoutAdminSidenavRoutes,
  LayoutAdminFooterRoutes
} from '@app/layouts/admin-layout';

const routesAdmin: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      ...LayoutAdminToolbarRoutes,
      ...LayoutAdminSidenavRoutes,
      ...LayoutAdminFooterRoutes,
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      { path: 'users', loadChildren: './user/user.module#UserModule' },
      { path: 'topics', loadChildren: './topic/topic.module#TopicModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routesAdmin)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
