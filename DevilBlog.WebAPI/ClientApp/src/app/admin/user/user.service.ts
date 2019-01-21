import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { DataService } from '@app/core';
import { User } from '@app/models';

@Injectable()
export class UserService {

  public usersUrl = 'api/user';
  constructor(
    private dataService: DataService
  ) { }

  public getUsers(): Observable<User[]> {
    return this.dataService.get<User[]>(this.usersUrl);
  }
}
