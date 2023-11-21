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
    isLoggedIn = false;
    username?: string;

    navbarExtended: boolean = false;
    darkMode = true;

    constructor(
        private storageService: StorageService,
        private authService: AuthService,
    ) {
        const theme = window.localStorage.getItem("THEME");
        this.darkMode = theme != 'light';
    }

    ngOnInit(): void {
        this.isLoggedIn = this.storageService.isLoggedIn();
        if (this.isLoggedIn) {
            const user = this.storageService.getUser();

            this.username = user?.email;
        }
    }

    logout(): void {
        this.authService.logout();
    }

    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        window.localStorage.setItem("THEME", this.darkMode ? "dark" : "light");
    }
}
