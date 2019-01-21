import { Routes } from '@angular/router';

import { AdminFooterComponent } from './footer.component';

export const LayoutAdminFooterRoutes: Routes = [
    {
        path: '', component: AdminFooterComponent, outlet: 'devil-admin-footer'
    }
];
