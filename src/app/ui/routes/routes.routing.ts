import {Routes} from '@angular/router';
import {MessageDisplayContainerComponent} from "./message-display-container/message-display-container.component";
import {GroupsMessageContainerComponent} from "./groups-message-container/groups-message-container.component";
import {UploadMessageContainerComponent} from "./upload-message-container/upload-message-container.component";


export const routes: Routes = [
    {
        path: "",
        children: [
            {
                path: 'upload-file',
                component: UploadMessageContainerComponent
            },
            {
                path: "message-groups",
                component: GroupsMessageContainerComponent,
            },
            {
                path: "message-groups/:group_id",
                component: MessageDisplayContainerComponent,
            }
        ],
    },
];
