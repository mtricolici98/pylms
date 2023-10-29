import {Component, OnInit} from '@angular/core';
import {Course} from "../../models/course";
import {CourseService} from "../../_services/course.service";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

    courseList: Course[];
    loaded: boolean;

    constructor(private courseService: CourseService, private toastr: ToastrService) {
    }

    ngOnInit() {
        this.loaded = false;
        this.courseService.getAvailableCourses().subscribe({
            next: data => {
                this.courseList = data;
                this.loaded = true;
            },
            error: err => {
                if (err.error) {
                    try {
                        const res = JSON.parse(err.error);
                        this.toastr.error(res.message);
                    } catch {
                        this.toastr.error(`Error with status: ${err.status} - ${err.statusText}`);
                    }
                } else {
                    this.toastr.error(`Error with status: ${err.status}`);
                }
                this.loaded = true;
            }
        });
    }

}
