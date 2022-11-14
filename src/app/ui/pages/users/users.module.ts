import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { IndexUserComponent } from './index-user/index-user.component';
import { SharedModule } from '../../shared/shared.module';
import { ShowUserComponent } from './show-user/show-user.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [IndexUserComponent, ShowUserComponent, ProfileComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
