import {Injectable} from "@angular/core";
import {GetUserUsecase} from "../../domain/usecase/get-user-usecase";
import {Observable, Subject} from "rxjs";
import {LoginRequest} from "../../domain/models/user/body-request/login-request";
import {UserSession} from "../../domain/models/user/api/user-session";
import {takeUntil} from "rxjs/operators";
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class SessionService {

    private _logged: Subject<{ success: boolean, typeUser: string }>;
    private _userSession: UserSession;
    private _unsubscribeSubject: Subject<void>

    private readonly _TYPE_USER: string = 'HL7_TYPE_USER';
    private readonly _USER_SESSION: string = 'auth';
    private readonly _USER_TOKEN: string = 'HL7_USER_TOKEN';
    private readonly _USER_ID: string = 'HL7_USER_ID';


    constructor(private _getUserUseCase: GetUserUsecase, private _cookie: CookieService) {
        this._unsubscribeSubject = new Subject<void>();
        this._logged = new Subject<{ success: boolean, typeUser: string }>();
    }

    public login(email: string, password: string, recaptcha: string): Observable<{ success: boolean, typeUser: string }> {

        const user: LoginRequest = {
            email: email,
            password: password
        }

        this._getUserUseCase.login(user, recaptcha).pipe(takeUntil(this._unsubscribeSubject)).subscribe((userSession: UserSession) => {
            this._setUserLogged(userSession)
        }, () => {
            this.logout();
        })

        return this._logged.asObservable();
    }

    public logout(): void {
        this._userSession = undefined;
        this._clearSessionStorageValue();
        this._logged.next({success: false, typeUser: ''});
    }

    private _setUserLogged(userSession: UserSession): void {
        this._userSession = userSession;
        this._setSessionStorageValue();
        this._logged.next({success: true, typeUser: userSession.type_user.toString()});
    }

    private _setSessionStorageValue(): void {
        this._clearSessionStorageValue();
        localStorage.setItem(this._USER_SESSION, JSON.stringify(this._userSession));
        let user: UserSession = JSON.parse(localStorage.getItem('auth'));
        this._cookie.delete('csrftoken')
        this._cookie.set('csrftoken', user.csrf_token, null, '/')
    }

    private _clearSessionStorageValue(): void {
        // let user: UserSession = JSON.parse(localStorage.getItem('auth'));
        // if (user.name == "Guest user") {
        //     localStorage.removeItem(this._USER_SESSION);
        // }
    }
}