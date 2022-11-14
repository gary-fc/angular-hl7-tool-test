import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest,} from "@angular/common/http";
import {Observable} from "rxjs";
import {State, Store} from "@ngrx/store";
import {UserState} from "../driven-adapter/user-api/user.reducer";
import {GetUserUsecase} from "src/app/domain/usecase/get-user-usecase";
import {CookieService} from "ngx-cookie-service";
import {UserSession} from "../../domain/models/user/api/user-session";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private _store: Store<UserState>,
        private _state: State<UserState>,
        private _getUserUseCase: GetUserUsecase,
        private _cookie: CookieService
    ) {
    }

    user?: UserSession;

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        return this.addSecurity(request, next);
    }

    private addSecurity(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {

        let addHeaders: { [name: string]: string } = {};

        if (request.headers.get('recaptcha')) {
            addHeaders = this.addRecaptcha(request, addHeaders)
        }

        if (request.headers.get('csrf')) {
            addHeaders = this.addCsrfToken(request, addHeaders)
        }

        if (request.headers.get('token')) {
            addHeaders = this.addToken(request, addHeaders)
        }

        let headersClone = new HttpHeaders(addHeaders);
        let reqClone = request.clone({
            headers: headersClone,
            withCredentials: true,
        });
        return next.handle(reqClone);
    }

    private addRecaptcha(
        request: HttpRequest<unknown>,
        headers: { [key: string]: string }
    ): { [key: string]: string } {
        headers["recaptcha"] = request.params.get("recaptcha")
        return headers
    }

    private addCsrfToken(
        request: HttpRequest<unknown>,
        headers: { [key: string]: string }
    ): { [key: string]: string } {
        headers["X-CSRFToken"] = this._cookie.get("csrftoken")
        return headers
    }


    private addToken(
        request: HttpRequest<unknown>,
        headers: { [key: string]: string }
    ): { [key: string]: string } {
        headers["Authorization"] = `Bearer ${this.user?.access}`
        return headers

    }


}
