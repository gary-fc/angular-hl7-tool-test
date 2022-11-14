import {NgModule} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {MatNativeDateModule} from "@angular/material/core";
import {AppComponent} from "./app.component";
import {SidebarModule} from "./sidebar/sidebar.module";
import {FooterModule} from "./shared/footer/footer.module";
import {NavbarModule} from "./shared/navbar/navbar.module";
import {FixedpluginModule} from "./shared/fixedplugin/fixedplugin.module";
import {AdminLayoutComponent} from "./layouts/admin/admin-layout.component";
import {AuthLayoutComponent} from "./layouts/auth/auth-layout.component";
import {BrowserModule} from "@angular/platform-browser";
import {UserGateway} from "./domain/models/user/gateway/user-gateway";
import {UserApiService} from "./infraestructure/driven-adapter/user-api/user-api.service";
import {GroupGateway} from "./domain/models/group_message/gateway/group-gateway";
import {GroupApiService} from "./infraestructure/driven-adapter/group-api/group-api.service";
import {MessageGateway} from "./domain/models/message/gateway/message-gateway";
import {MessageApiService} from "./infraestructure/driven-adapter/message-api/message-api.service";
import {FileGateway} from "./domain/models/files/gateway/file-gateway";
import {FileApiService} from "./infraestructure/driven-adapter/file-api/file-api.service";
import {AuthInterceptor} from "./infraestructure/interceptors/auth.interceptor";
import {SharedModule} from "./ui/shared/shared.module";
import {AdminModule} from "./ui/pages/admin/admin.module";
import {ClientModule} from "./ui/pages/client/client.module";
import {AppRoutingModule} from "./app.routing";
import {StoreModule} from "@ngrx/store";
import {userReducer} from "./infraestructure/driven-adapter/user-api/user.reducer";
import {ClientLayoutComponent} from "./layouts/client/client-layout.component";
import {CookieGateway} from "./domain/models/cookie/gateway/cookie-gateway";
import {CookieApiService} from "./infraestructure/driven-adapter/cookie-api/cookie-api.service";
import {groupReducer} from "./infraestructure/driven-adapter/group-api/group.reducer";


let modules: any = [ClientModule, AdminModule];

@NgModule({
    declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, ClientLayoutComponent],
    imports: [
        BrowserModule,
        CommonModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SidebarModule,
        NavbarModule,
        FooterModule,
        FixedpluginModule,
        SharedModule,
        StoreModule.forRoot({user: userReducer, groups: groupReducer}),
        modules
    ],
    exports: [],
    providers: [
        MatNativeDateModule,
        {provide: UserGateway, useClass: UserApiService},
        {provide: GroupGateway, useClass: GroupApiService},
        {provide: MessageGateway, useClass: MessageApiService},
        {provide: FileGateway, useClass: FileApiService},
        {provide: CookieGateway, useClass: CookieApiService},
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},

    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
