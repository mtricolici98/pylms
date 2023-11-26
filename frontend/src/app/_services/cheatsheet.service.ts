import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GLOBAL_API_URL} from "./url";

const API_URL = `http://${GLOBAL_API_URL}/api/lms/cheatsheet/`;

@Injectable({
    providedIn: 'root',
})
export class CheatsheetService {
    constructor(private http: HttpClient) {
    }

    getAllElements(): Observable<any> {
        return this.http.get(API_URL + 'list/');
    }


}
