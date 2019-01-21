import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';

const routesUsers: Routes = [
    { path: '', component: ListUsersComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routesUsers)],
    exports: [RouterModule]
})

export class UserRoutingModule { }
