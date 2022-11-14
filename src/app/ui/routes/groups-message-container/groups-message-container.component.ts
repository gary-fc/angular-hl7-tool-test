import {AfterViewInit, Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {AppBaseSmartComponent} from "../../core/app-base-smart-component";
import {GetGroupUsecase} from "../../../domain/usecase/get-group-usecase";
import {GetUserUsecase} from "../../../domain/usecase/get-user-usecase";
import {Subscription} from "rxjs";
import {IGroup} from "../../../domain/models/group_message/IGroup";
import {GroupMessageEvents} from "../../events/group-message/group-message.events";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UserSession} from "../../../domain/models/user/api/user-session";

@Component({
    selector: 'app-groups-message-container',
    templateUrl: './groups-message-container.component.html',
    styleUrls: ['./groups-message-container.component.css']
})
export class GroupsMessageContainerComponent extends AppBaseSmartComponent<GroupMessageEvents> implements OnInit, AfterViewInit, OnDestroy {
    user: UserSession = {};
    groups!: IGroup[];
    private subscription: Subscription;

    constructor(private _getGroupUseCase: GetGroupUsecase,
                private _getUserUseCase: GetUserUsecase,
                private _router: Router,
                private _injector: Injector, private _http: HttpClient) {
        super();
    }

    public ngOnInit(): void {
        this._initialize();
    }

    public ngAfterViewInit(): void {

    }

    public ngOnDestroy(): void {
        this._finalize();
    }

    public handleDumbMessage(type: GroupMessageEvents, payload: any) {
        switch (type) {
            case GroupMessageEvents.VIEW_GROUP:
                this._viewGroupMessages(payload.payload)
                break;
            case GroupMessageEvents.DOWNLOAD_GROUP:
                this._downloadGroupMessages(payload.payload)
                break;

            case GroupMessageEvents.DELETE_GROUP:
                this._deleteGroupMessages(payload.payload)
                break;

            case GroupMessageEvents.UPDATE_GROUP_NAME:
                this._updateGroupName(payload.payload)
                break;
        }
    }

    protected injector(): Injector {
        return this._injector;
    }

    private _initialize(): void {
        this.getUserState();
        this.getGroupsForUser();
    }

    private _finalize(): void {
    }

    private _updateGroupName(id: any) {
        let input = (<HTMLInputElement>document.getElementById('input-edit-' + id)).value;
        this.groups[id].custom_name = input;
        let json = {
            group_id: this.groups[id].id,
            user_id: this.user.id,
            new_name: input,
        };
        this._getGroupUseCase.updateGroupName(this.groups[id].id, this.user.id, input).subscribe((response) => {
        })
    }

    private getUserState() {
        // this._store.select("user").subscribe((user) => {
        //     this.user = user;
        //     if (user.type_user == 5) {
        //         this.user.id = this._cookie.get("csrf");
        //     }
        // });
        this.user = JSON.parse(localStorage.getItem('auth'));
    }

    private getGroupsForUser() {
        this.subscription = this._getGroupUseCase
            .getGroupsForUser(this.user.id!)
            .subscribe((groups) => {
                this.groups = groups;
            });
    }

    private _viewGroupMessages(groupId: any) {
        if (this.user.type_user != 1) {
            this._router.navigateByUrl(`/messages/message-groups/${groupId}`);
        } else {
            this._router.navigateByUrl(`/admin/messages/message-groups/${groupId}`);
        }
    }

    private _downloadGroupMessages(groupId: string) {
        let url = this._getGroupUseCase.downloadGroupMessages(
            this.user.id!,
            groupId
        );
        window.open(url, "_blank");
    }

    private _deleteGroupMessages(payload: any) {
        let group_id = payload.event.target.id;
        this._getGroupUseCase
            .deleteGroupMessages(this.user.id!, group_id)
            .subscribe((response) => {
                if (response.success) {
                    this.groups.splice(payload.groupId, 1);
                }
            });
    }

}
