import {AfterViewInit, Component, Injector, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppBaseSmartComponent} from "../../core/app-base-smart-component";
import {UploadMessageEvents} from "../../events/upload-message/upload-message.events";
import {ICurrentStatusRestriction} from "../../../domain/models/user/ICurrentStatusRestriction";
import {GetUserUsecase} from "../../../domain/usecase/get-user-usecase";
import {Subscription} from "rxjs";
import swal from "sweetalert2";
import {GetFileUsecase} from "../../../domain/usecase/get-file-usecase";
import {RecaptchaComponent} from "../../shared/recaptcha/recaptcha.component";
import {Router} from "@angular/router";
import {User} from "../../../domain/models/user/user";

@Component({
    selector: 'app-upload-message-container',
    templateUrl: './upload-message-container.component.html',
    styleUrls: ['./upload-message-container.component.css']
})
export class UploadMessageContainerComponent extends AppBaseSmartComponent<UploadMessageEvents> implements OnInit, AfterViewInit, OnDestroy {
    public current_status_restriction: ICurrentStatusRestriction;
    active?: boolean = false;
    public files?: File[];
    recaptchaToken?: string;

    private user: User;

    private subscription: Subscription;

    @ViewChild(RecaptchaComponent) recaptcha: RecaptchaComponent;

    constructor(private _getUserUseCase: GetUserUsecase,
                private _getFileUseCase: GetFileUsecase,
                private _router: Router,
                private _injector: Injector) {
        super();
        this.subscription = new Subscription();
    }

    public ngOnInit(): void {
        this._initialize();
    }

    public ngAfterViewInit(): void {
        this._initialize();
    }

    public ngOnDestroy(): void {
        this._finalize();
    }

    public handleDumbMessage(type: UploadMessageEvents, payload: any) {
        switch (type) {
            case UploadMessageEvents.UPLOAD_FILE:
                this.recaptcha.execute()
                break;
        }
    }

    getToken(token: string) {
        this.recaptchaToken = token;
        this._saveFile();
    }


    public getFile(event: any) {
        let currentStatusRestriction = this.current_status_restriction
        this.files = Array.from(event.target.files);
        //read file
        const reader = new FileReader();
        reader.onload = (e) => {
            const number_messages = reader.result.toString().split("MSH").length - 1;
            if (
                number_messages + currentStatusRestriction.messages_currently <=
                currentStatusRestriction.message_limit
            ) {
                if (
                    this.files[0].size / 1000000 <=
                    currentStatusRestriction.size_limit
                ) {
                    this.active = true;
                } else {
                    this._showSwal(
                        "success-message",
                        "The file exceeds the allowed limit!",
                        "Upload a file of maximum 5mb"
                    );
                    document.getElementById("btn-remove").click();
                }

                if (
                    currentStatusRestriction.groups_currently ==
                    currentStatusRestriction.group_limit
                ) {
                    this._showSwal(
                        "success-message",
                        "Number of groups allowed exceeded",
                        ""
                    );
                    document.getElementById("btn-remove").click();
                }
            } else {
                this._showSwal(
                    "success-message",
                    "Number of messages exceeded!",
                    `Maximum ${currentStatusRestriction.message_limit} messages allowed. There are currently ${currentStatusRestriction.messages_currently} messages loaded already and you are trying to load another ${number_messages} messages.`
                );
                document.getElementById("btn-remove").click();
            }
        };
        reader.readAsText(this.files![0]);
    }


    protected injector(): Injector {
        return this._injector;
    }

    private _initialize(): void {
        this._getCurrentUser()
        this._getCurrentStatusRestriction();
    }

    private _finalize(): void {
        this.subscription.unsubscribe();
    }

    private _getCurrentUser(): void {
        this.user = JSON.parse(localStorage.getItem('auth'))
    }

    private _getCurrentStatusRestriction() {
        const guest_user: boolean = this.user.type_user == 5
        this.subscription = this._getUserUseCase
            .getCurrentStatusRestriction(this.user.id, guest_user)
            .subscribe(
                (currentStatusRestriction) => {
                    this.current_status_restriction = currentStatusRestriction
                }
            );
    }

    private _saveFile() {
        swal.fire({title: 'Please wait', allowOutsideClick: false, allowEscapeKey: false})
        swal.showLoading()
        const guest_user: boolean = this.user.type_user == 5
        let formData: FormData = new FormData();
        formData.append("file0", this.files![0]);
        this._getFileUseCase
            .saveFile(formData, this.user.id, guest_user, this.recaptchaToken)
            .subscribe(
                (response) => {
                    if (response.success) {
                        swal.close()
                        this._getCurrentStatusRestriction();
                        if (this.user.type_user == 1) {
                            this._router.navigate(["admin/messages/message-groups"]);
                        } else {
                            this._router.navigate(["/messages/message-groups"]);
                        }
                    }
                },
                (error) => {
                    this._showSwal("success-message", error.error.message, "");
                }
            );
    }


    private _showSwal(type, title, text) {
        if (type == "success-message") {
            swal.fire({
                title: title,
                text: text,
                buttonsStyling: false,
                customClass: {
                    confirmButton: "btn btn-info",
                },
                icon: "error",
            });
        }
    }

}
