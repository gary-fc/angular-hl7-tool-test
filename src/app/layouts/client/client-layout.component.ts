import {AfterViewInit, Component, Injector, OnDestroy, OnInit, ViewChild,} from "@angular/core";
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {NavItem, NavItemType} from "../../md/md.module";
import {Location, PopStateEvent,} from "@angular/common";
import {NavbarComponent} from "../../shared/navbar/navbar.component";
import PerfectScrollbar from "perfect-scrollbar";
import {Subscription} from "rxjs";
import {filter} from "rxjs/operators";
import {GetUserUsecase} from "../../domain/usecase/get-user-usecase";
import {User} from "../../domain/models/user/user";
import {AppBaseSmartComponent} from "../../ui/core/app-base-smart-component";
import {ClientLayoutEvents} from "./events/client-layout.events";
import {Store} from "@ngrx/store";
import {UserState} from "../../infraestructure/driven-adapter/user-api/user.reducer";
import {LogoutAction} from "../../infraestructure/driven-adapter/user-api/user.actions";
import {CookieService} from "ngx-cookie-service";

@Component({
    selector: "app-client",
    templateUrl: "./client-layout.component.html",
    styleUrls: ["./client-layout.component.css"],
})
export class ClientLayoutComponent extends AppBaseSmartComponent<ClientLayoutEvents> implements OnInit, AfterViewInit, OnDestroy {

    public navItems: NavItem[];
    public user: User;

    private _router: Subscription;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    private _location: Location;
    url: string;

    @ViewChild("sidebar", {static: false}) sidebar: any;
    @ViewChild(NavbarComponent, {static: false}) navbar: NavbarComponent;

    constructor(private _getUserUseCase: GetUserUsecase,
                private _cookieService: CookieService,
                private _store: Store<UserState>,
                private _injector: Injector,
                private location: Location,
                private router: Router) {
        super();
        this._location = location;
    }

    public ngOnInit(): void {
        this._initialize()
        this._validateUserSession()
    }

    public ngAfterViewInit(): void {
        this._runOnRouteChange();
        this._validateUserSession();
    }

    public ngOnDestroy(): void {
        this._finalize();
    }

    public handleDumbMessage(type: ClientLayoutEvents, payload: any) {
        switch (type) {
            case ClientLayoutEvents.LOGOUT:
                this._logout();
                break;
        }
    }

    public isMap() {
        return this.location.prepareExternalUrl(this.location.path()) === "/maps/fullscreen";
    }

    protected injector(): Injector {
        return this._injector;
    }

    private _initialize(): void {
        this._loadHtml()
    }

    private _finalize(): void {

    }

    private _loadHtml(): void {
        const elemMainPanel = <HTMLElement>document.querySelector(".main-panel");
        const elemSidebar = <HTMLElement>(
            document.querySelector(".sidebar .sidebar-wrapper")
        );
        this.location.subscribe((ev: PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationStart) {
                if (event.url != this.lastPoppedUrl)
                    this.yScrollStack.push(window.scrollY);
            } else if (event instanceof NavigationEnd) {
                if (event.url == this.lastPoppedUrl) {
                    this.lastPoppedUrl = undefined;
                    window.scrollTo(0, this.yScrollStack.pop());
                } else window.scrollTo(0, 0);
            }
        });
        this._router = this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                elemMainPanel.scrollTop = 0;
                elemSidebar.scrollTop = 0;
            });
        const html = document.getElementsByTagName("html")[0];
        if (window.matchMedia(`(min-width: 960px)`).matches && !this._isMac()) {
            let ps = new PerfectScrollbar(elemMainPanel);
            ps = new PerfectScrollbar(elemSidebar);
            html.classList.add("perfect-scrollbar-on");
        } else {
            html.classList.add("perfect-scrollbar-off");
        }
        this._router = this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                this.navbar.sidebarClose();
            });

        this.navItems = [
            {
                type: NavItemType.NavbarLeft,
                title: "Dashboard",
                iconClass: "fa fa-dashboard",
            },

            {
                type: NavItemType.NavbarRight,
                title: "",
                iconClass: "fa fa-bell-o",
                numNotifications: 5,
                dropdownItems: [
                    {title: "Notification 1"},
                    {title: "Notification 2"},
                    {title: "Notification 3"},
                    {title: "Notification 4"},
                    {title: "Another Notification"},
                ],
            },
            {
                type: NavItemType.NavbarRight,
                title: "",
                iconClass: "fa fa-list",

                dropdownItems: [
                    {iconClass: "pe-7s-mail", title: "Messages"},
                    {iconClass: "pe-7s-help1", title: "Help Center"},
                    {iconClass: "pe-7s-tools", title: "Settings"},
                    "separator",
                    {iconClass: "pe-7s-lock", title: "Lock Screen"},
                    {iconClass: "pe-7s-close-circle", title: "Log Out"},
                ],
            },
            {
                type: NavItemType.NavbarLeft,
                title: "Search",
                iconClass: "fa fa-search",
            },

            {type: NavItemType.NavbarLeft, title: "Account"},
            {
                type: NavItemType.NavbarLeft,
                title: "Dropdown",
                dropdownItems: [
                    {title: "Action"},
                    {title: "Another action"},
                    {title: "Something"},
                    {title: "Another action"},
                    {title: "Something"},
                    "separator",
                    {title: "Separated link"},
                ],
            },
            {type: NavItemType.NavbarLeft, title: "Log out"},
        ];
    }

    private _logout(): void {
        this._store.dispatch(new LogoutAction());
    }

    private _runOnRouteChange(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this._isMac()) {
            const elemSidebar = <HTMLElement>(
                document.querySelector(".sidebar .sidebar-wrapper")
            );
            const elemMainPanel = <HTMLElement>document.querySelector(".main-panel");
            let ps = new PerfectScrollbar(elemMainPanel);
            ps = new PerfectScrollbar(elemSidebar);
            ps.update();
        }
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

    private _validateUserSession(): void {
        let user = localStorage.getItem('auth');
        if (!user) {
            this._createGuestUserSession()
        } else {
            this.user = JSON.parse(localStorage.getItem('auth'));
        }
    }

    private _createGuestUserSession(): void {
        this._getUserUseCase.getCsrfToken().subscribe((response) => {
            const guest_user: User = new User();
            guest_user.id = response.csrf_token;
            guest_user.name = "Guest user";
            guest_user.type_user = 5;
            guest_user.first_name = "Guest user";

            this._cookieService.set('csrftoken', response.csrf_token, null, '/')
            localStorage.setItem('auth', JSON.stringify(guest_user))
            this.user = JSON.parse(localStorage.getItem('auth'))
        })

    }
}
