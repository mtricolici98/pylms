export class HomeworkTask {
    id: string;
    task_name: string;
    task_text: string;
    attachments?: Blob;
    link?: string;
}

export class Homework {
    id: number;
    introduction: string;
    enabled: boolean;
    homework_tasks: HomeworkTask[];
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

export class Course {
    id: number;
    title: string;
    description: string;
    image: string;

    lessons?: Lesson[];
}
``
