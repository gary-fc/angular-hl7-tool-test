import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageGateway } from '../models/message/gateway/message-gateway';
import { IMessage, IMessageResponse } from '../models/message/IMessage';
import { IUpdatedMessage } from '../models/message/IUpdated-message';

@Injectable({
  providedIn: 'root',
})
export class GetMessageUseCase {
  constructor(private _messageGateway: MessageGateway) {}

  getGroupMessages(
    user_id: string,
    group_id: string,
    page_size: number,
    page_num: number
  ): Observable<IMessageResponse> {
    return this._messageGateway.getGroupMessages(
      user_id,
      group_id,
      page_size,
      page_num
    );
  }

  getSearchMessages(
    user_id: string,
    group_id: string,
    search: string
  ): Observable<IMessage[]> {
    return this._messageGateway.getSearchMessages(user_id, group_id, search);
  }

  getFiltersMessages(
    filters: string,
    user_id: string,
    group_id: string,
    page_size: number,
    page_num: number,
    recaptcha: string
  ): Observable<IMessageResponse> {
    return this._messageGateway.getFiltersMessages(
      filters,
      user_id,
      group_id,
      page_size,
      page_num,
      recaptcha
    );
  }
  updateMesssage(updated_message: IUpdatedMessage) {
    return this._messageGateway.updateMessage(updated_message);
  }
}
