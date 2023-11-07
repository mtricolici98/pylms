import {Component, OnInit} from '@angular/core';
import {Course, Lesson} from "../../models/course";
import {CourseService} from "../../_services/course.service";
import {ActivatedRoute} from "@angular/router";
import {Toast, ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-course-overview',
    templateUrl: './course-overview.component.html',
    styleUrls: ['./course-overview.component.css']
})
export class CourseOverviewComponent implements OnInit {

    course: Course;
    loading: boolean;

    constructor(private courseService: CourseService, private route: ActivatedRoute, private tostr: ToastrService) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(
            (map) => {
                if (map.has('id')) {
                    this.loadCourse(map.get('id'));
                }
            }
        );
    }

    loadCourse(courseId: string | null) {
        this.loading = true;
        if (!courseId) {
            // TODO: Navigate to 404
            return;
        }
        this.courseService.getCourseById(courseId).subscribe(
            {
                next: (el) => {
                    this.course = el;
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


    isLessonAvailable(lesson: Lesson) {
        return new Date(lesson.available_from) < new Date();
    }


    isLatest(lesson: Lesson) {
        try {
            return this.course?.lessons?.filter(el => this.isLessonAvailable(el)).sort(
                (a, b) => new Date(b.available_from).getTime() - new Date(a.available_from).getTime()
            )[0].id === lesson.id;
        } catch (ex) {
            return false;
        }
    }

    availabilityStyles(lesson: Lesson) {
        if (!this.isLessonAvailable(lesson)) {
            return [
                'cursor-default',
                ''
            ];
        }
        return [];
    }
}
