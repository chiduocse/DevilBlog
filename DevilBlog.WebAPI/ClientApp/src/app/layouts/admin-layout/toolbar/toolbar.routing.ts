import { Routes } from '@angular/router';

import { AdminToolbarComponent } from './toolbar.component';

export const LayoutAdminToolbarRoutes: Routes = [
    { path: '', component: AdminToolbarComponent, outlet: 'devil-admin-toolbar' }
];
