import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Lesson} from "../models/course";
import {GLOBAL_API_URL} from "./url";

const API_URL = `http://${GLOBAL_API_URL}/api/lms/lesson/`;

@Injectable({
    providedIn: 'root',
})
export class LessonService {
    constructor(private http: HttpClient) {
    }


    getLessonById(id: string): Observable<Lesson> {
        return this.http.get<Lesson>(API_URL + `get/${id}/`);
    }

    registerVisit(id: string): Observable<any> {
        return this.http.post(API_URL + `visited/${id}/`, {});
    }

    getLastForUser(): Observable<any> {
        return this.http.get(API_URL + `visited/last/`);
    }

    getHomeworkSubmission(lesson_id: number): Observable<any> {
        return this.http.get(API_URL + `homework/get/${lesson_id}/`);
    }

    getAllTaskSubmissions(task_id: number): Observable<any> {
        return this.http.get(API_URL + `homework/submissions/task/${task_id}/`);
    }

    changeSubmission(submission_id: number, approval: boolean | null, comment: string): Observable<any> {
        return this.http.post(API_URL + `homework/submissions/modify/${submission_id}/`,
            {approval, comment}
        );
    }

    getAllUserSubmissions(): Observable<any> {
        return this.http.get(API_URL + `homework/submissions/user/`);
    }

    submitHomework(data: FormData): Observable<any> {
        return this.http.post(API_URL + `homework/submit/`, data);
    }

}
