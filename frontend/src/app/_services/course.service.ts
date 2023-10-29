import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = 'http://localhost:8000/api/lms/course/';

@Injectable({
    providedIn: 'root',
})
export class CourseService {
    constructor(private http: HttpClient) {
    }

    getAvailableCourses(): Observable<any> {
        return this.http.get(API_URL + 'list/');
    }

}
