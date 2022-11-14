import { Observable } from 'rxjs';
import { IMessage, IMessageResponse } from '../IMessage';
import { IUpdatedMessage } from '../IUpdated-message';

export abstract class MessageGateway {
  abstract updateMessage(updated_message: IUpdatedMessage): Observable<any>;
  abstract getGroupMessages(
    user_id: string,
    group_id: string,
    page_size: number,
    page_num: number
  ): Observable<IMessageResponse>;

  abstract getSearchMessages(
    user_id: string,
    group_id: string,
    search: string
  ): Observable<IMessage[]>;

  abstract getFiltersMessages(
    filters: string,
    user_id: string,
    group_id: string,
    page_size: number,
    page_num: number,
    recaptcha: string
  ): Observable<IMessageResponse>;
}
