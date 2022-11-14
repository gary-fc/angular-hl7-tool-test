import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../../domain/models/user/user";
import {environment} from "../../../../../../environments/environment";

@Component({
    selector: 'app-sidebar-client-guest-part',
    templateUrl: './sidebar-client-guest-part.component.html',
    styleUrls: ['./sidebar-client-guest-part.component.css']
})
export class SidebarClientGuestPartComponent implements OnInit {
    @Input() user!: User;

    environment?: any;

    constructor() {
    }

    ngOnInit(): void {
        this.environment = environment
    }

}
