import {AfterViewInit, Component, Input} from '@angular/core';
import {BaseDumbComponent} from "../../../../core/base-dumb-component";

import {SmartComponent} from "../../../../core/smart-component";
import {MessageDisplayEvents} from "../../../../events/message-display/message_display.events";

@Component({
    selector: 'app-filter-view',
    templateUrl: './filter-view.component.html',
    styleUrls: ['./filter-view.component.css']
})
export class FilterViewComponent extends BaseDumbComponent<MessageDisplayEvents> implements AfterViewInit {

    @Input() public smartComponent: SmartComponent<MessageDisplayEvents>
    @Input() public filterQueue: any;

    public filterValue: string;

    private readonly _EMPTY = '';

    constructor() {
        super();
        this.filterValue = this._EMPTY;
    }

    public ngAfterViewInit(): void {
        super.init();
        this._initialize();
    }

    public getSmartComponent(): SmartComponent<MessageDisplayEvents> {
        return this.smartComponent;
    }

    public sendFilter() {
        this.emit(MessageDisplayEvents.SEND_FREE_TEXT_FILTER, this.filterValue);
        this.filterValue = this._EMPTY;
    }

    public remove_filter(index: number) {
        this.emit(MessageDisplayEvents.REMOVE_FILTER, index);
    }

    public remove_all_filters(): void {
        this.emit(MessageDisplayEvents.REMOVE_ALL_FILTERS)
    }

    private _initialize() {
        this.emit(MessageDisplayEvents.GET_ALL_MESSAGES);
    }


}
