import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {StorageService} from './_services/storage.service';
import {AuthService} from './_services/auth.service';
import {EventBusService} from './_shared/event-bus.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    private roles: string[] = [];
    isLoggedIn = false;
    showAdminBoard = false;
    showModeratorBoard = false;
    username?: string;

    eventBusSub?: Subscription;
    navbarExtended: boolean = false;

    constructor(
        private storageService: StorageService,
        private authService: AuthService,
        private eventBusService: EventBusService
    ) {
    }

    ngOnInit(): void {
        this.isLoggedIn = this.storageService.isLoggedIn();

        if (this.isLoggedIn) {
            const user = this.storageService.getUser();

            this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
            this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

            this.username = user?.email;
        }

        this.eventBusSub = this.eventBusService.on('logout', () => {
            this.logout();
        });
    }

    logout(): void {
        this.authService.logout();
    }
}
