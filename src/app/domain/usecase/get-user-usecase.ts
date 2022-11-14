import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserGateway} from '../models/user/gateway/user-gateway';
import {ICurrentStatusRestriction} from '../models/user/ICurrentStatusRestriction';
import {IGroupPermissions} from '../models/user/IGroupPermissions';
import {User, UserResponse} from '../models/user/user';
import {LoginRequest} from "../models/user/body-request/login-request";
import {UserSession} from "../models/user/api/user-session";
import {RegisterRequest} from "../models/user/body-request/register-request";

@Injectable({
    providedIn: 'root',
})
export class GetUserUsecase {
    constructor(private _userGateway: UserGateway) {
    }

    login(user: LoginRequest, recaptcha?: string): Observable<UserSession> {
        return this._userGateway.login(user, recaptcha);
    }

    refreshToken(token: string): Observable<UserSession> {
        return this._userGateway.refreshToken(token);
    }

    register(user: RegisterRequest, recaptcha: string): Observable<UserResponse> {
        return this._userGateway.register(user, recaptcha);
    }

    getUser(user_id: string): Observable<User> {
        return this._userGateway.getUser(user_id);
    }

    getUserList(): Observable<User[]> {
        return this._userGateway.getUserList();
    }

    deleteUser(user_id: string): Observable<UserResponse> {
        return this._userGateway.deleteUser(user_id);
    }

    changeRole(user_id: string, group_id: string): Observable<UserResponse> {
        return this._userGateway.changeRole(user_id, group_id);
    }

    getGroupPermissions(): Observable<IGroupPermissions> {
        return this._userGateway.getGroupPermissions();
    }

    getCurrentStatusRestriction(user_id: string, guest_user: boolean): Observable<ICurrentStatusRestriction> {
        return this._userGateway.getCurrentStatusRestriction(user_id, guest_user);
    }

    getCsrfToken(): Observable<any> {
        return this._userGateway.getCsrfToken();
    }
}
