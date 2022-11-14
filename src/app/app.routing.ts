import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AdminLayoutComponent} from "./layouts/admin/admin-layout.component";
import {AuthLayoutComponent} from "./layouts/auth/auth-layout.component";
import {ClientLayoutComponent} from "./layouts/client/client-layout.component";
import {UploadMessageContainerComponent} from "./ui/routes/upload-message-container/upload-message-container.component";

const routes: Routes = [
    {
        path: "",
        component: ClientLayoutComponent,
        children: [
            {
                path: "",
                component: UploadMessageContainerComponent,
            },
            {
                path: "messages",
                loadChildren: () =>
                    import("./ui/routes/routes.module").then(
                        (m) => m.RoutesModule
                    ),
            }
        ],
    },
    {
        path: "admin",
        component: AdminLayoutComponent,
        children: [
            {
                path: "messages",
                loadChildren: () =>
                    import("./ui/routes/routes.module").then(
                        (m) => m.RoutesModule
                    ),
            },
            {
                path: "users",
                loadChildren: () =>
                    import("./ui/pages/users/users.module").then(
                        (m) => m.UsersModule
                    ),
            },
        ],
    },
    {
        path: "auth",
        component: AuthLayoutComponent,
        children: [
            {
                path: "",
                loadChildren: () =>
                    import("./pages/pages.module").then((m) => m.PagesModule),
            },
        ],
    },
    {
        path: "**",
        redirectTo: ""
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
