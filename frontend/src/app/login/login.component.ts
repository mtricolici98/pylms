import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {StorageService} from '../_services/storage.service';
import {Router} from "@angular/router";
import {User} from "../models/user";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    form: any = {
        email: null,
        password: null
    };
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessages: string[] = [];
    roles: string[] = [];

    constructor(private authService: AuthService, private storageService: StorageService, private router: Router) {
    }

    ngOnInit(): void {
        if (this.storageService.isLoggedIn()) {
            this.router.navigate(['home']);
        }
    }

    onSubmit(): void {
        const {email, password} = this.form;
        this.errorMessages = [];

        this.authService.login(email, password).subscribe({
            next: data => {
                const user = new User(
                    data.email
                );
                this.storageService.saveUser(user);
                this.storageService.saveToken(data.token);
                this.isLoginFailed = false;
                this.isLoggedIn = true;
                this.reloadPage();
            },
            error: err => {
                let err_msg: string[] = [];
                for (const err_msgs in err.error) {
                    err_msg = err_msg.concat(err.error[err_msgs]);
                }

                this.errorMessages = err_msg;
                this.isLoginFailed = true;
            }
        });
    }

    reloadPage(): void {
        window.location.reload();
    }
}
