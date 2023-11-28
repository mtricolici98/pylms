import {User} from "./user";

export class HomeworkTask {
    id: number;
    task_name: string;
    task_text: string;
    attachments?: Blob;
    link?: string;
    submission: HomeworkSubmission;
    submission_edit: boolean = false;
    submissions?: HomeworkSubmission[];
    submissions_loaded = false;
}

export class Homework {
    id: number;
    introduction: string;
    enabled: boolean;
    homework_tasks: HomeworkTask[];
    approved?: boolean;
}

export class Lesson {
    id: number;
    order: number;
    title: string;
    course: Course;
    available_from: Date;
    summary: string;
    content: string;
    homework: Homework;
    homework_enabled?: boolean;
}


export class HomeworkSubmission {
    id: number;
    task_id: number;
    code: string;
    attachment?: File | { url: string; name: string } | any;
    new: boolean;
    approved: boolean | null;
    comment: string;
    user: User;
}

export class Course {
    id: number;
    title: string;
    description: string;
    image: string;

    lessons?: Lesson[];
}

``;
