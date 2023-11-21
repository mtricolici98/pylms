import {Component, OnInit} from '@angular/core';
import {Lesson} from "../../models/course";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {LessonService} from "../../_services/lesson.service";
import {Title} from "@angular/platform-browser";

class Heading {
    id: string;
    title: string;
    subheading: boolean;
}

@Component({
    selector: 'app-lesson-view',
    templateUrl: './lesson-view.component.html',
    styleUrls: ['./lesson-view.component.css']
})
export class LessonViewComponent implements OnInit {

    lesson: Lesson;
    loading: boolean;

    headings: Heading[];
    navbarExtended = false;

    private headingOnLoad = '';

    constructor(private lessonService: LessonService, private route: ActivatedRoute,
                private tostr: ToastrService, private title: Title, private router: Router) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(
            (map) => {
                if (map.has('id')) {
                    this.loadLesson(map.get('id'));
                }
            }
        );
        this.route.fragment.subscribe((el) => {
            if (el) {
                this.headingOnLoad = el;
            }
        });
    }

    loadLesson(courseId: string | null) {
        this.loading = true;
        if (!courseId) {
            this.router.navigate(['/']).then(
                () => {
                    this.tostr.error(`Lesson not found`);
                }
            );
            return;
        }
        this.lessonService.getLessonById(courseId).subscribe(
            {
                next: (el) => {
                    this.lesson = el;
                    this.loading = false;
                    this.title.setTitle(this.lesson.title);
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

    getHeadings() {
        console.log(this);
    }

    onHeadingsChange(elements: undefined | NodeListOf<Element>) {
        this.headings = [];
        elements?.forEach(
            (element) => {
                this.headings.push({
                    id: element.getAttribute('id') || '',
                    title: element?.textContent?.toString() || "??",
                    subheading: element.tagName == 'h2'
                });
            }
        );
        if (this.headingOnLoad) {
            this.navigateToAnchor(this.headingOnLoad);
        }
    }

    navigateToAnchor(id: string) {
        this.router.navigate(
            [], {fragment: id}
        );
    }
}
