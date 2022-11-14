import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from '../driven-adapter/user-api/user.reducer';
import {IGroup, UserSession} from "../../domain/models/user/api/user-session";

@Directive({
  selector: '[appUserRole]',
})
export class UserRoleDirective implements OnInit {
  user?: UserSession;
  groupPermissions?: string[];
  permissions?: IGroup[];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private _store: Store<UserState>
  ) {}

  ngOnInit(): void {

  }

  getUser(){
    this._store.select('user').subscribe((user) => {
      this.user = user;
    });
  }

  @Input()
  set appUserRole(groupPermissions: string[]) {
    this.groupPermissions = groupPermissions;
    this.getUser();
    this.updateView();
  }

  updateView() {
    this.viewContainer.clear();
    if (this.checkPermission()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  checkPermission(): boolean {
    let hasPermission = false;
    if (this.user != null && this.user.groups != null) {
      this.groupPermissions?.forEach((groupPermission) => {
        const permissionFound = this.user?.groups?.find((p) => {
          return (p.fields?.name?.toUpperCase() == groupPermission.toUpperCase())
        });
        if (permissionFound) {
          hasPermission = true;
        }
      });
    }
    return hasPermission;
  }
}
