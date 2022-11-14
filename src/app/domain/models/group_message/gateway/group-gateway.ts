import {Observable} from 'rxjs';
import {IGroup, IGroupResponse} from '../IGroup';

export abstract class GroupGateway {
    abstract getGroupsForUser(user_id: string): Observable<IGroup[]>;

    abstract deleteGroupMessages(
        user_id: string,
        group_id: string
    ): Observable<IGroupResponse>;

    abstract downloadGroupMessages(user_id: string, group_id: string): string;

    abstract changeMessagesRegisteredUser(guest_user_id: string, user_id, is_delete: boolean): Observable<any>

    abstract updateGroupName(group_id: string, user_id: string, new_name: string): Observable<any>
}
