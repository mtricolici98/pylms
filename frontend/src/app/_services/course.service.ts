import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GLOBAL_API_URL} from "./url";

const API_URL = `http://${GLOBAL_API_URL}/api/lms/course/`;

@Injectable({
    providedIn: 'root',
})
export class CourseService {
    constructor(private http: HttpClient) {
    }

    getAvailableCourses(): Observable<any> {
        return this.http.get(API_URL + 'list/');
    }


    getCourseById(id: string): Observable<any> {
        return this.http.get(API_URL + `get/${id}/`);
    }

}
