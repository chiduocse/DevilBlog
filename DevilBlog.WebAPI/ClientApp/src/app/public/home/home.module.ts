import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { SharedModule } from '@app/shared';

const homeRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'index', component: HomeComponent }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(homeRoutes)
    ],
    declarations: [HomeComponent]
})
export class HomeModule { }
