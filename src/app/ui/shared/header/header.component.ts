import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogoutAction } from 'src/app/infraestructure/driven-adapter/user-api/user.actions';
import { UserState } from 'src/app/infraestructure/driven-adapter/user-api/user.reducer';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuItems?: any[];
  constructor(private _store: Store<UserState>) { }
  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  logout(){
    this._store.dispatch(new LogoutAction())
  }

  isMobileMenu() {
    if ($(window).width()! > 991) {
        return false;
    }
    return true;
};
}
