import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IndexUserComponent } from './index-user/index-user.component';
import { ShowUserComponent } from './show-user/show-user.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'index-user',component:IndexUserComponent},
  {path:'show-user/:user_id',component:ShowUserComponent},
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
