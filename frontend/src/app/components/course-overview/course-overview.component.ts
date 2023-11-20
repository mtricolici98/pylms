import {Component, OnInit} from '@angular/core';
import {Course, Lesson} from "../../models/course";
import {CourseService} from "../../_services/course.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Toast, ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-course-overview',
    templateUrl: './course-overview.component.html',
    styleUrls: ['./course-overview.component.css']
})
export class CourseOverviewComponent implements OnInit {

    course: Course;
    loading: boolean;

    constructor(private courseService: CourseService, private route: ActivatedRoute, private tostr: ToastrService, private title: Title, private router: Router) {
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
            this.router.navigate(['/']).then(
                () => {
                    this.tostr.error(`Course not found`);
                }
            );
            return;
        }
        this.courseService.getCourseById(courseId).subscribe(
            {
                next: (el) => {
                    this.course = el;
                    this.loading = false;
                    this.title.setTitle(this.course.title);
                },
                error: error => {
                    this.router.navigate(['/']).then(
                        () => {
                            this.tostr.error(`Course not found`);
                        }
                    );
                    return;
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
