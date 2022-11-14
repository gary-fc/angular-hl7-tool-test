import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {GroupGateway} from "src/app/domain/models/group_message/gateway/group-gateway";
import {IGroup, IGroupResponse,} from "src/app/domain/models/group_message/IGroup";
import {environment} from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class GroupApiService extends GroupGateway {

    updateGroupName(group_id: string, user_id: string, new_name: string): Observable<any> {
        return this._http.post(
            `${environment.url_back}/app/message/group/update_custom_name/`,
            {group_id: group_id, user_id: user_id, new_name: new_name}
        );
    }

    changeMessagesRegisteredUser(
        guest_user_id: string,
        user_id: string,
        is_delete: boolean
    ): Observable<any> {
        return this._http.post(
            `${environment.url_back}/app/message/group/change_messages_registered_user/`,
            {guest_user_id: guest_user_id, user_id: user_id, is_delete: is_delete}
        );
    }

    downloadGroupMessages(user_id: string, group_id: string): any {
        let url = `${environment.url_back}/app/message/messages/download_messages_with_group_id/?group_id=${group_id}&user_id=${user_id}`;
        return url;
    }

    deleteGroupMessages(
        user_id: string,
        group_id: string
    ): Observable<IGroupResponse> {
        return this._http.delete<IGroupResponse>(
            `${environment.url_back}/app/message/group/${group_id}/?user_id=${user_id}`
        );
    }

    getGroupsForUser(user_id: string): Observable<IGroup[]> {
        return this._http.get<IGroup[]>(
            `${environment.url_back}/app/message/group/for_user/?user_id=${user_id}`
        );
    }

    constructor(private _http: HttpClient) {
        super();
    }
}
