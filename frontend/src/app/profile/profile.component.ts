import {Component, OnInit} from '@angular/core';
import {StorageService} from '../_services/storage.service';
import {User} from "../models/user";
import {heroAcademicCap, heroPencilSquare} from "@ng-icons/heroicons/outline";
import {AuthService} from "../_services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    currentUser?: User | null;

    form: any = {
        password: null,
        password_conf: null
    };

    constructor(private storageService: StorageService, private authService: AuthService, private toastr: ToastrService) {
    }

    ngOnInit(): void {
        this.currentUser = this.storageService.getUser();
    }


    onSubmit(): void {
        const {password, password_conf} = this.form;
        if (!password) {
            this.toastr.error("Passwords is empty");
            return;
        }

        if (password != password_conf) {
            this.toastr.error("Passwords don't match");
            return;
        }

        this.authService.changePassword(password).subscribe({
            next: data => {
                this.toastr.success("Pass change success!");
                this.form.password = '';
                this.form.password_conf = '';
            },
            error: err => {
                let err_msg: string[] = [];
                for (const err_msgs in err.error) {
                    err_msg = err_msg.concat(err.error[err_msgs]);
                }

            }
        });
    }

}
