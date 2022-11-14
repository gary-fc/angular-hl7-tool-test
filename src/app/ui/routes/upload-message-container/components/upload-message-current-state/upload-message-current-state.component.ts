import {AfterViewInit, Component, Input} from '@angular/core';
import {ICurrentStatusRestriction} from "../../../../../domain/models/user/ICurrentStatusRestriction";
import {BaseDumbComponent} from "../../../../core/base-dumb-component";
import {UploadMessageEvents} from "../../../../events/upload-message/upload-message.events";
import {SmartComponent} from "../../../../core/smart-component";

@Component({
    selector: 'app-upload-message-current-state',
    templateUrl: './upload-message-current-state.component.html',
    styleUrls: ['./upload-message-current-state.component.css']
})
export class UploadMessageCurrentStateComponent extends BaseDumbComponent<UploadMessageEvents> implements AfterViewInit {
    @Input() public smartComponent: SmartComponent<UploadMessageEvents>;
    @Input() public current_status_restriction: ICurrentStatusRestriction;

    constructor() {
        super();
    }

    ngAfterViewInit(): void {
        super.init();
    }

    getSmartComponent(): SmartComponent<UploadMessageEvents, void, void, void, void> {
        return this.smartComponent;
    }

}
