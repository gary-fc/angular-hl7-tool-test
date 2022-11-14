import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CookieGateway } from "../models/cookie/gateway/cookie-gateway";
import { ICookie } from "../models/cookie/ICookie";

@Injectable({providedIn:'root'})
export class GetCookieUsecase{
    constructor(private _cookieGateway: CookieGateway){}

    getCookie(): Observable<ICookie>{
        return this._cookieGateway.getCookie();
    }
}