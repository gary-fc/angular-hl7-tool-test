import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

// import { FlexLayoutModule } from '@angular/flex-layout';
import {PagesRoutes} from './pages.routing';

import {RegisterComponent} from './register/register.component';
import {PricingComponent} from './pricing/pricing.component';
import {LockComponent} from './lock/lock.component';

import {SharedModule} from '../ui/shared/shared.module';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SessionService} from "../infraestructure/services/session.service";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PagesRoutes),
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        PricingComponent,
        LockComponent
    ],
    providers: [
        SessionService
    ]
})

export class PagesModule {
}
