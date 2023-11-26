import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = 'http://localhost:8000/api/lms/cheatsheet/';

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
