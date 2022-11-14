import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {BaseDumbComponent} from "../../../../core/base-dumb-component";
import {UploadMessageEvents} from "../../../../events/upload-message/upload-message.events";
import {SmartComponent} from "../../../../core/smart-component";

@Component({
    selector: 'app-upload-message-input-file',
    templateUrl: './upload-message-input-file.component.html',
    styleUrls: ['./upload-message-input-file.component.css']
})
export class UploadMessageInputFileComponent extends BaseDumbComponent<UploadMessageEvents> implements AfterViewInit {
    @Input() smartComponent: SmartComponent<UploadMessageEvents>

    public fileName: string;
    @Output() getFileEvent: EventEmitter<any>;

    constructor() {
        super();
        this.getFileEvent = new EventEmitter<any>();
    }

    public ngAfterViewInit(): void {
        super.init();
    }

    public getSmartComponent(): SmartComponent<UploadMessageEvents> {
        return this.smartComponent;
    }

    getFile(event: any): void {
        this.fileName = event.target.files[0].name
        this.getFileEvent.emit(event);
    }

    uploadFile() {
        this.emit(UploadMessageEvents.UPLOAD_FILE)
    }

}
