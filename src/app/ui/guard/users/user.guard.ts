import {Injectable} from "@angular/core";
import {CanActivate, Router,} from "@angular/router";
import {Store} from "@ngrx/store";
import {UserState} from "src/app/infraestructure/driven-adapter/user-api/user.reducer";

@Injectable({
    providedIn: "root",
})
export class UserGuard implements CanActivate {
    constructor(private _router: Router, private _store: Store<UserState>) {
    }

    public canActivate(): boolean {
        let auth = JSON.parse(localStorage.getItem('auth'))
        return !!(auth!);
    }
}

@Injectable({
    providedIn: "root",
})
export class UserAdminGuard implements CanActivate {
    constructor(private _router: Router, private _store: Store<UserState>) {
    }

    canActivate() {
        this._store.select("user").subscribe((user) => {
            if (user == null || user.type_user != 1) {
                this._router.navigateByUrl("/401-access-forbidden");
            }
        });

        return true;
    }
}
