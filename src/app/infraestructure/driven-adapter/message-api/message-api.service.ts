import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {MessageGateway} from "src/app/domain/models/message/gateway/message-gateway";
import {IMessage, IMessageResponse,} from "src/app/domain/models/message/IMessage";
import {IUpdatedMessage} from "src/app/domain/models/message/IUpdated-message";
import {environment} from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class MessageApiService extends MessageGateway {
    updateMessage(updated_message: IUpdatedMessage): Observable<any> {
        return this._http.post<any>(
            `${environment.url_back}/app/message/messages/update_message_with_id/`,
            updated_message
        );
    }

    getFiltersMessages(
        filters: any,
        user_id: string,
        group_id: string,
        page_size: number,
        page_num: number,
        recaptcha: string
    ): Observable<IMessageResponse> {
        return this._http.post<IMessageResponse>(
            `${environment.url_back}/app/message/messages/get_all_messages_with_filters/`,
            filters,
            {params: {recaptcha: recaptcha}, headers: {recaptcha: "true", csrf: "true"}}
        );
    }

    getGroupMessages(
        user_id: string,
        group_id: string,
        page_size: number,
        page_num: number
    ): Observable<IMessageResponse> {
        return this._http.get<IMessageResponse>(
            `${environment.url_back}/app/message/messages/get_messages/?user_id=${user_id}&group_id=${group_id}&page_size=${page_size}&page_num=${page_num}`
        );
    }

    getSearchMessages(
        user_id: string,
        group_id: string,
        search: string
    ): Observable<IMessage[]> {
        return this._http.get<IMessage[]>(
            `${environment.url_back}/app/message/messages/get_all_messages_with_value/?user_id=${user_id}&group_id=${group_id}&value=${search}`
        );
    }

    constructor(private _http: HttpClient) {
        super();
    }
}
