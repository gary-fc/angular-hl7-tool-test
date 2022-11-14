import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild,} from "@angular/core";
import {Router} from "@angular/router";
import {State, Store} from "@ngrx/store";
import {CookieService} from "ngx-cookie-service";
import {UserState} from "src/app/infraestructure/driven-adapter/user-api/user.reducer";
import {RecaptchaComponent} from "src/app/ui/shared/recaptcha/recaptcha.component";
import {environment} from '../../../environments/environment';
import {Subject, Subscription} from "rxjs";
import {SessionService} from "../../infraestructure/services/session.service";
import {takeUntil} from "rxjs/operators";
import swal from "sweetalert2";

declare var $: any;

@Component({
    selector: "app-login-cmp",
    templateUrl: "./login.component.html",
})
export class LoginComponent implements AfterViewInit, OnDestroy {

    public incorrectCredentials: boolean;
    test: Date = new Date();
    private sidebarVisible: boolean;
    private nativeElement: Node;
    email: string = "";
    password: string = "";
    recaptchaToken?: string;
    environment?: any;

    private _subscription: Subscription;
    private _unsubscribeSubject: Subject<void>;

    @ViewChild(RecaptchaComponent, {static: true})
    recaptcha: RecaptchaComponent;

    constructor(
        private _sessionService: SessionService,
        private element: ElementRef,
        private _store: Store<UserState>,
        private _state: State<UserState>,
        private _router: Router,
        private _cookie: CookieService
    ) {
        this._unsubscribeSubject = new Subject<void>();
        this.nativeElement = element.nativeElement;
        this._subscription = new Subscription();
        this.environment = environment.brand
        this.incorrectCredentials = false;
        this.sidebarVisible = false;
    }

    public ngAfterViewInit(): void {
        this._initialize();
    }

    public ngOnDestroy() {
        this._finalize();
    }

    private _initialize(): void {
        const body = document.getElementsByTagName("body")[0];
        body.classList.add("login-page");
        body.classList.add("off-canvas-sidebar");
        const card = document.getElementsByClassName("card-login")[0];
        card.classList.remove("card-hidden");
    }

    private _finalize(): void {
        const body = document.getElementsByTagName("body")[0];
        body.classList.remove("login-page");
        body.classList.remove("off-canvas-sidebar");
        this._subscription.unsubscribe();
    }

    public executeToken(): void {
        this.recaptcha.execute();
    }

    public getToken(token: string): void {
        swal.fire({title: 'Please wait', allowOutsideClick: false, allowEscapeKey: false})
        swal.showLoading()
        this.recaptchaToken = token;
        this._login();
    }

    private _login() {
        this._sessionService.login(this.email, this.password, this.recaptchaToken).pipe(takeUntil(this._unsubscribeSubject)).subscribe((isLogged: { success: boolean, typeUser: string }) => {
            if (isLogged.success) {
                swal.close()
                if (isLogged.typeUser === '1') {
                    this._router.navigate(['/admin/messages/upload-file']);
                } else {
                    this._router.navigate(['/']);
                }
            }
            swal.close()
            this._incorrectCredentials();
        })
    }

    private _incorrectCredentials(): void {
        this.recaptcha.reset();
        this.email = "";
        this.password = "";
        this.incorrectCredentials = true;
    }

}
