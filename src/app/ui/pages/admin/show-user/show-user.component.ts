import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {GetUserUsecase} from 'src/app/domain/usecase/get-user-usecase';
import {UserState} from 'src/app/infraestructure/driven-adapter/user-api/user.reducer';
import {UserSession} from "../../../../domain/models/user/api/user-session";

@Component({
    selector: 'app-show-user',
    templateUrl: './show-user.component.html',
    styleUrls: ['./show-user.component.css'],
})
export class ShowUserComponent implements OnInit {
    select_group?: string;
    group_names: any[] = [
        {name: 'Administrator', value: '1'},
        {name: 'Basic Client', value: '2'},
        {name: 'Regular Customer', value: '3'},
        {name: 'Premium Client', value: '4'},
    ];
    user?: UserSession;
    check?: number;
    user_id?: string;

    constructor(
        private _store: Store<UserState>,
        private _getUserUsecase: GetUserUsecase,
        private _route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.getUserState();
        this.getUser();
    }

    getUserState() {
        this._store.select('user').subscribe((user) => {
            this.user = user;
        });
    }

    getUser() {
        let user_id = this._route.snapshot.paramMap.get('user_id');
        this._getUserUsecase.getUser(user_id!).subscribe((user) => {
            this.user_id = user.id;
            this.check = user.type_user;
            this.select_group = this.check?.toString();
        });
    }

    changeRole(event: any) {
        this.select_group = event.value;
        this._getUserUsecase
            .changeRole(this.user_id!, this.select_group!)
            .subscribe(
                (data) => {
                },
                (error) => {
                }
            );
    }
}
