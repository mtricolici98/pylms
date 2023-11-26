import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgIcon} from "@ng-icons/core";
import {Homework, HomeworkSubmission, HomeworkTask, Lesson} from "../../models/course";
import {AppModule} from "../../app.module";
import {LessonService} from "../../_services/lesson.service";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-homework-display',
    templateUrl: './homework-display.component.html',
    styleUrl: './homework-display.component.css'
})
export class HomeworkDisplayComponent implements OnInit {

    @Input()
    homework: Homework;


    @Input()
    lesson_id: number;

    constructor(private lessonServices: LessonService, private toastr: ToastrService) {

    }


    ngOnInit() {
        this.lessonServices.getHomeworkSubmission(
            this.lesson_id
        ).subscribe(
            {
                next: (data: HomeworkSubmission[]) => {
                    this.homework.homework_tasks.forEach(
                        (task) => {
                            const submission = data.find((el) => el.task_id === task.id);
                            if (submission) {
                                task.submission = submission;
                            } else {
                                task.submission = new HomeworkSubmission();
                                task.submission.new = true;
                            }
                        }
                    );
                },
                error: () => {
                    this.toastr.error("Unable to load submitted homework");
                }
            }
        );
    }

    onSubmit(task: HomeworkTask) {
        const formData = new FormData();
        if (task?.submission?.attachment) {
            formData.append("file", task.submission?.attachment);
        }
        formData.append("task_id", task.id.toString());
        if (task.submission?.code) {
            formData.append("code", task.submission?.code);
        }
        this.lessonServices.submitHomework(formData).subscribe(
            {
                next: (submission) => {
                    task.submission_edit = false;
                    task.submission.new = false;
                    this.toastr.success("Submission Successful");
                    task.submission = {...task.submission, ...submission};
                },
                error: () => {
                    this.toastr.error("Failed to upload homework");
                }
            }
        );
    }

    onFileSelected(task: HomeworkTask, $event: Event) {
        // @ts-ignore
        const file: File = $event.target.files[0];
        if (file) {
            if (task.submission) {
                task.submission.attachment = file;
            }
        }
    }
}
