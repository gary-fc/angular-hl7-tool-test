import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../../../domain/models/user/user";
import {environment} from '../../../../../../environments/environment';

@Component({
    selector: 'app-sidebar-client-user-part',
    templateUrl: './sidebar-client-user-part.component.html',
    styleUrls: ['./sidebar-client-user-part.component.css']
})
export class SidebarClientUserPartComponent implements OnInit {
    @Input() user!: User;
    environment?: any;

    @Output() logoutEvent: EventEmitter<void>;

    constructor() {
        this.logoutEvent = new EventEmitter<void>();
    }

    ngOnInit(): void {
        this.environment = environment
    }

    public logout(): void {
        this.logoutEvent.emit();
    }

}
