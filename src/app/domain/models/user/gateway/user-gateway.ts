import {Observable} from "rxjs";
import {ICurrentStatusRestriction} from "../ICurrentStatusRestriction";
import {IGroupPermissions} from "../IGroupPermissions";
import {User, UserResponse} from "../user";
import {LoginRequest} from "../body-request/login-request";
import {UserSession} from "../api/user-session";
import {RegisterRequest} from "../body-request/register-request";

export abstract class UserGateway {
    abstract login(
        user: LoginRequest,
        recaptcha?: string
    ):

        Observable<UserSession>;

    abstract refreshToken(token: string): Observable<UserSession>;

    abstract register(user: RegisterRequest, recaptcha: string): Observable<UserResponse>;

    abstract getUser(user_id: string): Observable<User>;

    abstract getUserList(): Observable<User[]>;

    abstract deleteUser(user_id: string): Observable<UserResponse>;

    abstract changeRole(
        user_id: string,
        group_id: string
    ): Observable<UserResponse>;

    abstract getGroupPermissions(): Observable<IGroupPermissions>;

    abstract getCurrentStatusRestriction(
        user_id: string,
        guest_user: boolean
    ): Observable<ICurrentStatusRestriction>;

    abstract getCsrfToken(): Observable<any>;
}
