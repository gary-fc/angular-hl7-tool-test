import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageDisplayContainerComponent} from './message-display-container/message-display-container.component';
import {FilterViewComponent} from './message-display-container/components/filter-view/filter-view.component';
import {
    MainTableMessagesComponent
} from './message-display-container/components/main-table-messages/main-table-messages.component';
import {
    MessagePagingTableComponent
} from './message-display-container/components/message-paging-table/message-paging-table.component';
import {
    FieldTreeSegmentComponent
} from './message-display-container/components/field-tree-segment/field-tree-segment.component';
import {UploadMessageContainerComponent} from './upload-message-container/upload-message-container.component';
import {
    UploadMessageCurrentStateComponent
} from './upload-message-container/components/upload-message-current-state/upload-message-current-state.component';
import {
    UploadMessageInputFileComponent
} from './upload-message-container/components/upload-message-input-file/upload-message-input-file.component';
import {GroupsMessageContainerComponent} from './groups-message-container/groups-message-container.component';
import {
    GroupsMessageListComponent
} from './groups-message-container/components/groups-message-list/groups-message-list.component';
import {RouterModule} from "@angular/router";
import {routes} from "./routes.routing";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    declarations: [
        MessageDisplayContainerComponent,
        FilterViewComponent,
        MainTableMessagesComponent,
        MessagePagingTableComponent,
        FieldTreeSegmentComponent,
        UploadMessageContainerComponent,
        UploadMessageCurrentStateComponent,
        UploadMessageInputFileComponent,
        GroupsMessageContainerComponent,
        GroupsMessageListComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
    ]
})
export class RoutesModule {
}
