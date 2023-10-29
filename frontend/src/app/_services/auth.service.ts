import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageService} from "./storage.service";

const AUTH_API = 'http://localhost:8000/api/auth/';

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

    logout(): void {
        this.storageService.clean();
        window.location.reload();
    }
}
