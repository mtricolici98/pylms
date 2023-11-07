import {Component, Input} from '@angular/core';
import {Course} from "../../models/course";
import {Router} from "@angular/router";

@Component({
    selector: 'app-course-item-header',
    templateUrl: './course-item-header.component.html',
    styleUrls: ['./course-item-header.component.css']
})
export class CourseItemHeader {

    @Input()
    courseItem: Course;

    constructor(private router: Router) {
    }

    navigateToCourse() {
        this.router.navigate(['course', this.courseItem.id]);
    }

}
