import {AfterViewInit, Component, Input, OnDestroy} from "@angular/core";
import PerfectScrollbar from "perfect-scrollbar";
import {User} from "src/app/domain/models/user/user";
import {environment} from '../../../../environments/environment';
import {BaseDumbComponent} from "../../core/base-dumb-component";
import {SmartComponent} from "../../core/smart-component";
import {ClientLayoutEvents} from "../../../layouts/client/events/client-layout.events";
import {UserSession} from "../../../domain/models/user/api/user-session";

declare var $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [
    {
        path: "messages/message-groups",
        title: "View Messages",
        type: "link",
        icontype: "message",
    },
    {
        path: "",
        title: "Upload File",
        type: "link",
        icontype: "upload",
    },
];

@Component({
    selector: "app-sidebar-client",
    templateUrl: "./sidebar-client.component.html",
    styleUrls: ["./sidebar-client.component.css"],
})
export class SidebarClientComponent extends BaseDumbComponent<ClientLayoutEvents> implements AfterViewInit, OnDestroy {

    @Input() public smartComponent: SmartComponent<ClientLayoutEvents>;
    @Input() user: User;

    auth?: UserSession;
    environment?: any;
    guest?: boolean;
    _user?: User;

    public menuItems: any[];
    ps: any;
    private readonly _EMPTY: string = '';


    constructor() {
        super()
        this.environment = environment.brand
        this.auth = {
            id: this._EMPTY,
            access: this._EMPTY,
            type_user: -1,
            groups: [],
            config: [],
            success: false,
            detail: this._EMPTY,
            refresh: this._EMPTY
        };
        this._user = new User();
        this.guest = false;
        this.menuItems = [];
    }

    public ngAfterViewInit(): void {
        super.init();
        this.menuItems = ROUTES.filter((menuItem) => menuItem);
        if (window.matchMedia(`(min-width: 960px)`).matches && !this._isMac()) {
            const elemSidebar = <HTMLElement>(
                document.querySelector(".sidebar .sidebar-wrapper")
            );
            this.ps = new PerfectScrollbar(elemSidebar);
        }
    }

    public ngOnDestroy(): void {
    }

    public getSmartComponent(): SmartComponent<ClientLayoutEvents> {
        return this.smartComponent;
    }

    public isMobileMenu(): boolean {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }

    public updatePS(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this._isMac()) {
            this.ps.update();
        }
    }

    public logout(): void {
        this.emit(ClientLayoutEvents.LOGOUT)
    }

    private _isMac(): boolean {
        let bool = false;
        if (
            navigator.platform.toUpperCase().indexOf("MAC") >= 0 ||
            navigator.platform.toUpperCase().indexOf("IPAD") >= 0
        ) {
            bool = true;
        }
        return bool;
    }
}
