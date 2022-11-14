import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {UserGateway} from "src/app/domain/models/user/gateway/user-gateway";
import {ICurrentStatusRestriction} from "src/app/domain/models/user/ICurrentStatusRestriction";
import {User, UserResponse,} from "src/app/domain/models/user/user";
import {environment} from "src/environments/environment";
import {UserSession} from "../../../domain/models/user/api/user-session";
import {LoginRequest} from "../../../domain/models/user/body-request/login-request";

@Injectable({
    providedIn: "root",
})
export class UserApiService extends UserGateway {

    getCsrfToken(): Observable<any> {
        return this._http.get(
            `${environment.url_back}/app/user/user/get-csrf-token/`
        );
    }

    getCurrentStatusRestriction(
        user_id: string,
        guest_user: boolean
    ): Observable<ICurrentStatusRestriction> {
        return this._http.get(
            `${environment.url_back}/app/user/config/get_current_status_restriction/?user_id=${user_id}&guest_user=${guest_user}`
        );
    }

    refreshToken(token: string): Observable<UserSession> {
        return this._http.post(`${environment.url_back}/api/token/refresh/`, {
            refresh: token,
        });
    }

    getGroupPermissions(): Observable<any> {
        return this._http.get(`${environment.url_back}/app/user/user/get-groups/`);
    }

    changeRole(user_id: string, group_id: string): Observable<UserResponse> {
        let data = {user_id: user_id, group_id: group_id};

        return this._http.post(
            `${environment.url_back}/app/user/user/change-role/`,
            data
        );
    }

    getUser(user_id: string): Observable<User> {
        return this._http.get<User>(
            `${environment.url_back}/app/user/user/${user_id}/`
        );
    }

    deleteUser(user_id: string): Observable<UserResponse> {
        return this._http.delete<UserResponse>(
            `${environment.url_back}/app/user/user/${user_id}/`
        );
    }

    getUserList(): Observable<User[]> {
        return this._http.get<User[]>(`${environment.url_back}/app/user/user/`);
    }

    public login(
        user: LoginRequest,
        recaptcha?: string
    ): Observable<UserSession> {
        return this._http.post<UserSession>(
            `${environment.url_back}/api/token/`,
            user,
            {params: {recaptcha: recaptcha}, headers: {recaptcha: "true"}}
        );
    }

    register(user: User | any, recaptcha: string): Observable<UserResponse> {
        return this._http.post<UserResponse>(
            `${environment.url_back}/app/user/user/`,
            user,
            {params: {recaptcha: recaptcha}, headers: {recaptcha: "true"}}
        );
    }

    constructor(private _http: HttpClient) {
        super();
    }
}
