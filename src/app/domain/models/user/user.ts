export interface UserResponse {
    message?: string;
    success?: boolean;
    status?: number;
}

export class User {
    public date_joined?: Date;
    public email?: string;
    public first_name?: string;
    public groups?: any[];
    public id?: string;
    public img?: string;
    public is_superuser?: boolean;
    public is_staff?: boolean;
    public is_active?: boolean;
    public last_login?: Date;
    public last_name?: string;
    public name?: string;
    public password?: string;
    public type_user?: number;
    public username?: string;
    public user_permissions?: any[];

    private readonly _EMPTY: string = '';

    constructor() {
        this.date_joined = new Date();
        this.first_name = this._EMPTY;
        this.last_name = this._EMPTY;
        this.last_login = new Date();
        this.password = this._EMPTY;
        this.username = this._EMPTY;
        this.user_permissions = [];
        this.is_superuser = false;
        this.email = this._EMPTY;
        this.name = this._EMPTY;
        this.img = this._EMPTY;
        this.is_active = false;
        this.is_staff = false;
        this.id = this._EMPTY;
        this.type_user = 0;
        this.groups = [];
    }
}

export interface IUserList {
    count?: number;
    next?: null;
    previous?: null;
    results?: User[];
}
