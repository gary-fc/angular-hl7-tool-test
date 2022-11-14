import {Action} from "@ngrx/store";

import {LOGIN, LOGIN_GUEST, LOGOUT, REFRESH_TOKEN} from "./user.actions";
import {UserSession} from "../../../domain/models/user/api/user-session";

export interface UserState {
    user: UserSession;
}

export function userReducer(
    state: UserSession = JSON.parse(localStorage.getItem("auth")!),
    action: Action
) {
    switch (action.type) {
        case LOGIN:
            state = JSON.parse(localStorage.getItem("auth")!);
            return state;
        case LOGIN_GUEST:
            state = JSON.parse(localStorage.getItem("auth")!);
            return state;
        case LOGOUT:
            localStorage.clear();
            window.location.href = "/auth/login";
            return state;
        case REFRESH_TOKEN:
            state = JSON.parse(localStorage.getItem("auth")!);
            localStorage.clear();
            window.location.href = "/auth/login";
            return state;
    }
}
