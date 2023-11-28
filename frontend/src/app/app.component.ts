import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {StorageService} from './_services/storage.service';
import {AuthService} from './_services/auth.service';
import {EventBusService} from './_shared/event-bus.service';
import {LessonService} from "./_services/lesson.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

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
        private lessonService: LessonService,
        private router: Router,
        private toastr: ToastrService,
    ) {
        const theme = window.localStorage.getItem("THEME");
        this.darkMode = theme != 'light';
    }

    ngOnInit(): void {
        this.isLoggedIn = this.storageService.isLoggedIn();
        if (this.isLoggedIn) {
            const user = this.storageService.getUser();
            if (user) {
                this.username = user?.email;
                this.authService.getProfile().subscribe(
                    {
                        next: (data) => {
                            this.username = data.data[0].name;
                            user.name = data.data[0].name;
                            this.storageService.saveUser(user);
                        }
                    }
                );
            }
        }
    }

    logout(): void {
        this.authService.logout();
    }

    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        window.localStorage.setItem("THEME", this.darkMode ? "dark" : "light");
    }

    getLastUserLesson() {
        this.lessonService.getLastForUser().subscribe({
                next: (res) => {
                    if (res?.lesson_id) {
                        this.router.navigate(['/lesson', res.lesson_id]);
                    }
                },
                error: () => {
                    this.toastr.error("Could not find last course...");
                }
            }
        );
    }
}
