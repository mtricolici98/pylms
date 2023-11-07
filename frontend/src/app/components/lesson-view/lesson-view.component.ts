import {Component} from '@angular/core';
import {Course, Lesson} from "../../models/course";
import {CourseService} from "../../_services/course.service";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {LessonService} from "../../_services/lesson.service";

@Component({
    selector: 'app-lesson-view',
    templateUrl: './lesson-view.component.html',
    styleUrls: ['./lesson-view.component.css']
})
export class LessonViewComponent {

    lesson: Lesson;
    loading: boolean;

    constructor(private lessonService: LessonService, private route: ActivatedRoute, private tostr: ToastrService) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(
            (map) => {
                if (map.has('id')) {
                    this.loadLesson(map.get('id'));
                }
            }
        );
    }

    loadLesson(courseId: string | null) {
        this.loading = true;
        if (!courseId) {
            // TODO: Navigate to 404
            return;
        }
        this.lessonService.getLessonById(courseId).subscribe(
            {
                next: (el) => {
                    this.lesson = el;
                    this.loading = false;
                },
                error: error => {
                    this.tostr.error(error.error?.message || error.error);
                },
                complete: () => {
                    this.loading = false;
                }
            });
    }


}
