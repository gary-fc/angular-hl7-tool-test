import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {GroupGateway} from '../models/group_message/gateway/group-gateway';
import {IGroup, IGroupResponse} from '../models/group_message/IGroup';

@Injectable({providedIn: 'root'})
export class GetGroupUsecase {
    constructor(private _groupGateway: GroupGateway) {
    }

    getGroupsForUser(user_id: string): Observable<IGroup[]> {
        return this._groupGateway.getGroupsForUser(user_id);
    }

    deleteGroupMessages(
        user_id: string,
        group_id: string
    ): Observable<IGroupResponse> {
        return this._groupGateway.deleteGroupMessages(user_id, group_id);
    }

    downloadGroupMessages(user_id: string, group_id: string): string {
        return this._groupGateway.downloadGroupMessages(user_id, group_id);
    }

    changeMessagesRegisteredUser(guest_user_id: string, user_id, is_delete: boolean) {
        return this._groupGateway.changeMessagesRegisteredUser(guest_user_id, user_id, is_delete)
    }

    updateGroupName(group_id: string, user_id: string, new_name: string) {
        return this._groupGateway.updateGroupName(group_id, user_id, new_name)
    }
}
