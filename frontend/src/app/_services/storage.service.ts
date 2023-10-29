import {Injectable} from '@angular/core';
import {User} from "../models/user";

const USER_KEY = 'auth-user';
const TOKEN_KEY = 'auth-token';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    constructor() {
    }

    clean(): void {
        window.sessionStorage.clear();
    }

    public saveUser(user: User): void {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    public getUser(): User | null {
        const user = window.sessionStorage.getItem(USER_KEY);
        if (user) {
            return JSON.parse(user);
        }

        return null;
    }

    public getToken(): string | null {
        const token = window.sessionStorage.getItem(TOKEN_KEY);
        if (token) {
            return JSON.parse(token);
        }

        return null;
    }

    public saveToken(token: string): void {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, JSON.stringify(token));
    }

    public isLoggedIn(): boolean {
        const user = window.sessionStorage.getItem(TOKEN_KEY);
        return !!user;
    }
}
