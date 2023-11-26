import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageService} from "./storage.service";
import {GLOBAL_API_URL} from "./url";

const AUTH_API = `http://${GLOBAL_API_URL}/api/auth/`;

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient, private storageService: StorageService) {
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post(
            AUTH_API + 'signin',
            {
                email,
                password,
            },
            httpOptions
        );
    }

    register(name: string, email: string, password: string): Observable<any> {
        return this.http.post(
            AUTH_API + 'signup',
            {
                name,
                email,
                password,
            },
            httpOptions
        );
    }

    changePassword(new_password: string): Observable<any> {
        return this.http.post(
            AUTH_API + 'change_password',
            {
                new_password,
            },
            httpOptions
        );
    }

    logout(): void {
        this.storageService.clean();
        window.location.reload();
    }
}
