import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexUserComponent } from './index-user/index-user.component';
import { ProfileComponent } from './profile/profile.component';
import { ShowUserComponent } from './show-user/show-user.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "index-user",
        component: IndexUserComponent,
      },
      {
        path: "show-user/:id",
        component: ShowUserComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
