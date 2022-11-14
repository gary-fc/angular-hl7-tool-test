import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedRoutingModule} from "./shared-routing.module";

//Modules
import {HttpClientModule} from "@angular/common/http";

//Material
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatMenuModule} from "@angular/material/menu";

import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTreeModule} from "@angular/material/tree";
import {MatIconModule} from "@angular/material/icon";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
//Components
import {AccessForbiddenComponent} from "./access-forbidden/access-forbidden.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {ServerErrorComponent} from "./server-error/server-error.component";
import {NotCredentialsComponent} from "./not-credentials/not-credentials.component";

import {HeaderComponent} from "./header/header.component";
import {UserRoleDirective} from "src/app/infraestructure/directive/user-role.directive";

import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatChipsModule} from "@angular/material/chips";
import {MatStepperModule} from "@angular/material/stepper";
import {MatDialogModule} from "@angular/material/dialog";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatListModule} from "@angular/material/list";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSliderModule} from "@angular/material/slider";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSortModule} from "@angular/material/sort";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatNativeDateModule} from "@angular/material/core";
import {LoadingComponent} from "./loading/loading.component";
import {SidebarClientComponent} from './sidebar-client/sidebar-client.component';
import {SidebarAdminComponent} from './sidebar-admin/sidebar-admin.component';
import {RecaptchaModule} from "ng-recaptcha";
import {RecaptchaComponent} from './recaptcha/recaptcha.component';
import {
    SidebarClientUserPartComponent
} from './sidebar-client/components/sidebar-client-user-part/sidebar-client-user-part.component';
import {
    SidebarClientGuestPartComponent
} from './sidebar-client/components/sidebar-client-guest-part/sidebar-client-guest-part.component';
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";

let modules: any = [HttpClientModule, RecaptchaModule];

let material: any = [
    MatToolbarModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatTreeModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatStepperModule,
    MatDialogModule,
    MatGridListModule,
    MatListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatMenuModule,
    NgxSkeletonLoaderModule
];

let components: any = [HeaderComponent, LoadingComponent, SidebarClientComponent, SidebarAdminComponent, RecaptchaComponent];

@NgModule({
    declarations: [
        HeaderComponent,
        LoadingComponent,
        UserRoleDirective,
        AccessForbiddenComponent,
        NotFoundComponent,
        ServerErrorComponent,
        NotCredentialsComponent,
        SidebarClientComponent,
        SidebarAdminComponent,
        RecaptchaComponent,
        SidebarClientUserPartComponent,
        SidebarClientGuestPartComponent,

    ],
    imports: [CommonModule, SharedRoutingModule, modules, material],
    exports: [modules, material, components, UserRoleDirective],
})
export class SharedModule {
}
