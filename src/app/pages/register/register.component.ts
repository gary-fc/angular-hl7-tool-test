import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {State} from "@ngrx/store";
import {User} from "src/app/domain/models/user/user";
import {GetUserUsecase} from "src/app/domain/usecase/get-user-usecase";
import {RecaptchaComponent} from "src/app/ui/shared/recaptcha/recaptcha.component";
import {UserState} from '../../infraestructure/driven-adapter/user-api/user.reducer';
import {environment} from '../../../environments/environment';
import {RegisterRequest} from "../../domain/models/user/body-request/register-request";
import swal from "sweetalert2";

@Component({
    selector: "app-register-cmp",
    templateUrl: "./register.component.html",
})
export class RegisterComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    form;
    user: User;
    recaptchaToken?: string;

    environment ?: any;

    @ViewChild(RecaptchaComponent, {static: true})
    recaptcha: RecaptchaComponent;

    constructor(
        private _getUseUsecase: GetUserUsecase,
        private _router: Router,
        private _state: State<UserState>,
        private formBuilder: FormBuilder
    ) {
        this.form = formBuilder.group({
            username: ['', Validators.required],
            name: ['', Validators.required],
            email: ['', Validators.required, Validators.email],
            password: ['', Validators.required],
        })

        this.user = new User();
        this.environment = environment.brand
    }

    ngOnInit() {
        const body = document.getElementsByTagName("body")[0];
        body.classList.add("register-page");
        body.classList.add("off-canvas-sidebar");
    }

    ngOnDestroy() {
        const body = document.getElementsByTagName("body")[0];
        body.classList.remove("register-page");
        body.classList.remove("off-canvas-sidebar");
    }

    executeToken() {
        this.recaptcha.execute();
    }

    getToken(token: string) {
        swal.fire({title: 'Please wait', allowOutsideClick: false, allowEscapeKey: false})
        swal.showLoading()
        this.recaptchaToken = token;
        this.register();
    }

    register() {
        let guest = this._state.getValue().user;
        let group = this._state.getValue().groups;
        localStorage.setItem("guest_auth", JSON.stringify(guest));
        localStorage.setItem("guest_group", JSON.stringify(group));
        this.user.type_user = 2;
        let user: RegisterRequest = {
            username: this.user.username,
            name: this.user.name,
            email: this.user.email,
            password: this.user.password,
            type_user: this.user.type_user
        }
        this._getUseUsecase.register(user, this.recaptchaToken).subscribe((response) => {
            if (response.success) {
                swal.close()
                this._router.navigateByUrl("auth/login")
            }
            swal.close()
        });
    }
}
