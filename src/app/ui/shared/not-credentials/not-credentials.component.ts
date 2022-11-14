import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogoutAction } from 'src/app/infraestructure/driven-adapter/user-api/user.actions';
import { UserState } from 'src/app/infraestructure/driven-adapter/user-api/user.reducer';

@Component({
  selector: 'app-not-credentials',
  templateUrl: './not-credentials.component.html',
  styleUrls: ['./not-credentials.component.css']
})
export class NotCredentialsComponent implements OnInit {

  constructor(private _store:Store<UserState>) { }

  ngOnInit(): void {
    this.logout();
  }

  logout() {
    this._store.dispatch(new LogoutAction());
  }

}
