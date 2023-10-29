class HomeworkTask {
    task_name: string;
    task_text: string;
}

class Homework {
    id: number;
    content: string;
    attachments: any[];
    link: string;
    homework_tasks: HomeworkTask;
}

class Lesson {
    id: number;
    order: number;
    title: string;
    course: number;
    available_from: Date;
    content: number;
    homework: Homework;
}

export class Course {
    id: number;
    title: string;
    description: string;
    image: string;

    lessons?: Lesson[];
}