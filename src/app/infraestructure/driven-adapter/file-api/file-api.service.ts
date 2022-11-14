import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {FileGateway} from "src/app/domain/models/files/gateway/file-gateway";
import {IFileResponse} from "src/app/domain/models/files/IFile";

import {environment} from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class FileApiService extends FileGateway {
    saveFile(
        formData: FormData,
        user_id: string,
        guest_user: boolean,
        recaptcha?: string
    ): Observable<IFileResponse> {
        return this._http.post<IFileResponse>(
            `${environment.url_back}/app/message/files/`,
            formData,
            {
                params: {
                    user_id: user_id,
                    guest_user: guest_user,
                    recaptcha: recaptcha,
                }, headers: {
                    recaptcha: "true",
                    csrf: "true"
                },
                withCredentials: true,
            }
        );
    }

    constructor(private _http: HttpClient) {
        super();
    }
}
