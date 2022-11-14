import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {User} from 'src/app/domain/models/user/user';
import {GetUserUsecase} from 'src/app/domain/usecase/get-user-usecase';
import {UserState} from 'src/app/infraestructure/driven-adapter/user-api/user.reducer';
import {UserSession} from "../../../../domain/models/user/api/user-session";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    auth: UserSession;
    user: User;

    constructor(private _getUserUseCase: GetUserUsecase, private _store: Store<UserState>) {
    }

    ngOnInit(): void {
        this.getAuthentication();
    }

    getAuthentication() {
        this._store.select('user').subscribe((auth) => {
            this.auth = auth
            this.getUser();
        })
    }

    getUser() {
        this._getUserUseCase.getUser(this.auth.id).subscribe((user) => {
            this.user = user
        })
    }

}
