import {Action} from '@ngrx/store';

export const LOGIN = '[User] Login';
export const LOGIN_GUEST = '[User Guest] Login Guest';
export const LOGOUT = '[User] Logout';
export const REFRESH_TOKEN = '[User] Refresh Token';

export class LoginAction implements Action {
    readonly type = LOGIN;
}

export class LoginGuestAction implements Action {
    readonly type = LOGIN_GUEST;
}

export class LogoutAction implements Action {
    readonly type = LOGOUT;
}

export class RefreshTokenAction implements Action {
    readonly type = REFRESH_TOKEN;
}


