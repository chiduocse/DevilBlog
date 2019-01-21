import { Routes } from '@angular/router';

import { ToolbarComponent } from './toolbar.component';

export const LayoutToolbarRoutes: Routes = [
    { path: '', component: ToolbarComponent, outlet: 'public-toolbar' }
];
