import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CookieGateway} from 'src/app/domain/models/cookie/gateway/cookie-gateway';
import {ICookie} from 'src/app/domain/models/cookie/ICookie';
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CookieApiService extends CookieGateway {
    getCookie(): Observable<ICookie> {
        return this._http.get(`${environment.url_back}/app/user/user/get-csrf-token/`, {withCredentials: true});
    }

    constructor(private _http: HttpClient) {
        super();
    }
}
