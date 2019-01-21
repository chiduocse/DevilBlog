export class User {
  constructor(
    _id?: string,
    _userName?: string,
    _fullName?: string,
    _firstName?: string,
    _lastName?: string,
    _passWord?: string,
    _email?: string,
    _jobTitle?: string,
    _phoneNumber?: string,
    _roles?: string[]
  ) {
    this.id = _id;
    this.userName = _userName;
    this.fullName = _fullName;
    this.firstName = _firstName;
    this.lastName = _lastName;
    this.email = _email;
    this.phoneNumber = _phoneNumber;
    this.roles = _roles;
  }
  public id: string;
  public userName: string;
  public fullName: string;
  public firstName: string;
  public lastName: string;
  public passWord: string;
  public email: string;
  public jobTitle: string;
  public phoneNumber: string;
  public gender: boolean;
  public isEnabled: boolean;
  public isLockedOut: boolean;
  public roles: string[];
}
