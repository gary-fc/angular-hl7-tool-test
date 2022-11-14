import {AfterViewInit, Component, Input} from '@angular/core';
import {BaseDumbComponent} from "../../../../core/base-dumb-component";
import {MessageDisplayEvents} from "../../../../events/message-display/message_display.events";
import {SmartComponent} from "../../../../core/smart-component";
import {IMessage, IPagination} from "../../../../../domain/models/message/IMessage";


declare interface DataTable1 {
    headerRow: string[];
    dataRows: IMessage[];
}

@Component({
    selector: 'app-message-paging-table',
    templateUrl: './message-paging-table.component.html',
    styleUrls: ['./message-paging-table.component.css']
})
export class MessagePagingTableComponent extends BaseDumbComponent<MessageDisplayEvents> implements AfterViewInit {
    @Input() public smartComponent: SmartComponent<MessageDisplayEvents>
    @Input() public messagePagingTable?: DataTable1;
    @Input() public pagination!: IPagination;

    //pagination
    page_size = 10;
    page_num = 1;

    constructor() {
        super();
        this.messagePagingTable = {
            headerRow: [],
            dataRows: []
        };
    }

    ngAfterViewInit(): void {
        super.init()
    }

    getSmartComponent(): SmartComponent<MessageDisplayEvents> {
        return this.smartComponent;
    }

    clickMessages(i: number) {
        this.emit(MessageDisplayEvents.SELECT_MESSAGE, i);
        const messages = document.querySelectorAll('.active-message');
        messages.forEach((message) => {
            message.classList.remove('active-message');
        })
        document
            .getElementById("message-" + i.toString())
            ?.classList.toggle("active-message");
    }

    downloadMessage(id: string) {
        this.emit(MessageDisplayEvents.DOWNLOAD_MESSAGE, id)
    }

    public downloadAllMessages(): void {
        this.emit(MessageDisplayEvents.DOWNLOAD_ALL_MESSAGES);
    }


}
