import { User } from './user.model';

export class UserEdit extends User {
    constructor(
        _currentPassword?: string,
        _newPassword?: string,
        _confirmPassword?: string
    ) {
        super();
        this.currentPassword = _currentPassword;
        this.newPassword = _newPassword;
        this.confirmPassword = _confirmPassword;
    }
    public currentPassword: string;
    public newPassword: string;
    public confirmPassword: string;
}
