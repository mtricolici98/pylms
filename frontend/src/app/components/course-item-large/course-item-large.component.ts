import {Component, Input} from '@angular/core';
import {Course} from "../../models/course";
import {Router} from "@angular/router";

@Component({
    selector: 'app-course-item-large',
    templateUrl: './course-item-large.component.html',
    styleUrls: ['./course-item-large.component.css']
})
export class CourseItemLargeComponent {

    @Input()
    courseItem: Course;

    constructor(private router: Router) {
    }

    navigateToCourse() {
        this.router.navigate(['lesson', this.courseItem.id]);
    }

}
