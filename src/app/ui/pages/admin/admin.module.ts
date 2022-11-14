import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { IndexUserComponent } from './index-user/index-user.component';
import { HomeComponent } from './home/home.component';

import { ShowUserComponent } from './show-user/show-user.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    IndexUserComponent,
    HomeComponent,
    ShowUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
