import {AfterViewInit, Component, Input} from '@angular/core';
import {BaseDumbComponent} from "../../../../core/base-dumb-component";
import {MessageDisplayEvents} from "../../../../events/message-display/message_display.events";
import {SmartComponent} from "../../../../core/smart-component";
import {Segment} from "../../../../../domain/models/message/IMessage";

declare interface DataTable2 {
    headerRow: string[];
    dataRows: Segment[];
}

@Component({
    selector: 'app-main-table-messages',
    templateUrl: './main-table-messages.component.html',
    styleUrls: ['./main-table-messages.component.css']
})
export class MainTableMessagesComponent extends BaseDumbComponent<MessageDisplayEvents> implements AfterViewInit {
    @Input() public smartComponent: SmartComponent<MessageDisplayEvents>
    @Input() public mainMessageTable?: DataTable2

    constructor() {
        super();
        this.mainMessageTable = {
            headerRow: [],
            dataRows: []
        };
    }


    public ngAfterViewInit(): void {
        super.init();
        this._initialize();
    }

    public getSmartComponent(): SmartComponent<MessageDisplayEvents> {
        return this.smartComponent;
    }

    private _initialize(): void {
    }

    public clickPrincipal(segmentIndex: number) {
        this.emit(MessageDisplayEvents.SELECT_SEGMENT, segmentIndex)
        const segments = document.querySelectorAll('.active-segment');
        segments.forEach((message) => {
            message.classList.remove('active-segment');
        })
        document
            .getElementById("segment-" + segmentIndex.toString())
            ?.classList.toggle("active-segment");
    }

}
