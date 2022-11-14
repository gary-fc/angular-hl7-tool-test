import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {UserState} from 'src/app/infraestructure/driven-adapter/user-api/user.reducer';
import {UserSession} from "../../../../domain/models/user/api/user-session";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    user?: UserSession;

    constructor(private _store: Store<UserState>) {
    }

    ngOnInit(): void {
        this._store.select('user').subscribe((user) => {
            this.user = user;
        })
    }

}
