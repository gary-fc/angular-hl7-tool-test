import {AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {IGroup} from "../../../../../domain/models/group_message/IGroup";
import {SmartComponent} from "../../../../core/smart-component";
import {BaseDumbComponent} from "../../../../core/base-dumb-component";
import {GroupMessageEvents} from "../../../../events/group-message/group-message.events";

@Component({
    selector: 'app-groups-message-list',
    templateUrl: './groups-message-list.component.html',
    styleUrls: ['./groups-message-list.component.css']
})
export class GroupsMessageListComponent extends BaseDumbComponent<GroupMessageEvents> implements AfterViewInit, OnDestroy, OnChanges {

    @Input() public smartComponent: SmartComponent<GroupMessageEvents>;
    @Input() public groups!: IGroup[];

    public skeleton: boolean = true;

    constructor() {
        super();
        this.skeleton = true;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.skeleton = false;
    }

    public ngAfterViewInit(): void {
        super.init()
    }

    public ngOnDestroy(): void {
    }

    public getSmartComponent(): SmartComponent<any> {
        return this.smartComponent;
    }


    viewGroupMessages($event: any, groupId: any) {
        this.emit(GroupMessageEvents.VIEW_GROUP, groupId)
    }

    downloadGroupMessages(event: any, groupId: string) {
        this.emit(GroupMessageEvents.DOWNLOAD_GROUP, groupId)
    }

    deleteGroupMessages(event: any, groupId: any) {
        const payload = {"event": event, "groupId": groupId}
        this.emit(GroupMessageEvents.DELETE_GROUP, payload)
    }

    editName(id: any) {
        let input = document.getElementById('input-edit-' + id) as HTMLElement
        let input_name = document.getElementById('txt-custom-name-' + id) as HTMLElement
        input.classList.remove("input-edit-name");
        input_name.style.display = "none";
        input.focus()
    }

    saveName(id: any) {
        this.emit(GroupMessageEvents.UPDATE_GROUP_NAME, id);
        let input = document.getElementById('input-edit-' + id) as HTMLElement
        let input_name = document.getElementById('txt-custom-name-' + id) as HTMLElement
        input.classList.add("input-edit-name");
        input_name.style.display = "block";
    }

}
