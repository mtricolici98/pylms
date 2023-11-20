import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgIcon} from "@ng-icons/core";
import {Homework} from "../../models/course";
import {AppModule} from "../../app.module";

@Component({
    selector: 'app-homework-display',
    templateUrl: './homework-display.component.html',
    styleUrl: './homework-display.component.css'
})
export class HomeworkDisplayComponent {

    @Input()
    homework: Homework;

}
