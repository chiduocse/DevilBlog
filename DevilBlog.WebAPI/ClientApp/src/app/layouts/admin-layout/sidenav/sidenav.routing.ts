import { Routes } from '@angular/router';

import { AdminSidenavComponent } from './sidenav.component';

export const LayoutAdminSidenavRoutes: Routes = [
    { path: '', component: AdminSidenavComponent, outlet: 'devil-admin-sidenav' },
];
