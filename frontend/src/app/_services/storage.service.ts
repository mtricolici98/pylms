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
        window.localStorage.removeItem(USER_KEY);
        window.localStorage.removeItem(TOKEN_KEY);
    }

    public saveUser(user: User): void {
        window.localStorage.removeItem(USER_KEY);
        window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    public getUser(): User | null {
        const user = window.localStorage.getItem(USER_KEY);
        if (user) {
            return JSON.parse(user);
        }

        return null;
    }

    public getToken(): string | null {
        const token = window.localStorage.getItem(TOKEN_KEY);
        if (token) {
            return JSON.parse(token);
        }

        return null;
    }

    public saveToken(token: string): void {
        window.localStorage.removeItem(TOKEN_KEY);
        window.localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
    }

    public isLoggedIn(): boolean {
        const user = window.localStorage.getItem(TOKEN_KEY);
        return !!user;
    }

    public isAdmin(): boolean {
        return !!this.getUser()?.is_admin;
    }
}
