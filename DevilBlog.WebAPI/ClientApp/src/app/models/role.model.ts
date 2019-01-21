import { Permission } from './permission.model';


export interface Role {

    // constructor(name?: string, description?: string, permissions?: Permission[]) {

    //     this.name = name;
    //     this.description = description;
    //     this.permissions = permissions;
    // }

     id: string;
     name: string;
     description: string;
     usersCount: string;
     permissions: Permission[];
}
