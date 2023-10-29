import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {StorageService} from "../_services/storage.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    form: any = {
        name: null,
        email: null,
        password: null
    };
    isSuccessful = false;
    isSignUpFailed = false;
    errorMessages: string[] = [];

    constructor(
        private authService: AuthService, private tostr: ToastrService, private router: Router,
        private storageService: StorageService) {
    }

    ngOnInit() {
        if (this.storageService.isLoggedIn()) {
            this.router.navigate(['home']);
        }
    }

    onSubmit(): void {
        const {name, email, password} = this.form;

        this.authService.register(name, email, password).subscribe({
            next: data => {
                this.isSuccessful = true;
                this.isSignUpFailed = false;
                this.tostr.success("Registration success, you can now log-in.");
                this.router.navigate(['login']);
            },
            error: err => {
                let err_msg: string[] = [];
                for (const err_msgs in err.error) {
                    err_msg = err_msg.concat(err.error[err_msgs]);
                }

                this.errorMessages = err_msg;
                this.isSignUpFailed = true;
            }
        });
    }
}
