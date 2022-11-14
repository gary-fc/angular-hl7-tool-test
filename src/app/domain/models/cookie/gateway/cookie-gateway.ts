import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { ICookie } from "../ICookie";

export abstract class CookieGateway {
    abstract getCookie():Observable<ICookie>
}