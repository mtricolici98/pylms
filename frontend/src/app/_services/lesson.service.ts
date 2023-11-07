import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = 'http://localhost:8000/api/lms/lesson/';

@Injectable({
    providedIn: 'root',
})
export class LessonService {
    constructor(private http: HttpClient) {
    }


    getLessonById(id: string): Observable<any> {
        return this.http.get(API_URL + `get/${id}/`);
    }

}
