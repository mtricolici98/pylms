import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MarkdownService} from "ngx-markdown";
import {DOCUMENT} from "@angular/common";

@Component({
    selector: 'app-markdown-renderer',
    templateUrl: './markdown-renderer.component.html',
    styleUrls: ['./markdown-renderer.component.css']
})
export class MarkdownRendererComponent implements OnInit {

    @Input()
    content: string;

    @Input()
    id_prefix = '';


    @Output()
    headings = new EventEmitter<NodeListOf<Element> | undefined>();

    constructor(private mkds: MarkdownService, @Inject(DOCUMENT) private document: Document) {
        this.mkds.renderer
    }

    onReady() {
        setTimeout(() => {
            this.headings.next(this.document?.querySelector('main')?.querySelectorAll('h1,h2'));
        });
    }

    ngOnInit() {
        this.mkds.renderer.heading = (text: string, level: number) => {
            let escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
            escapedText = this.id_prefix + escapedText;
            switch (level) {
                case 1: {
                    return `<h1 class="text-5xl font-extrabold dark:text-white mb-2 mt-10" data-id="${escapedText}">` +
                        '<a data-id="${escapedText}" class="anchor" href="#' + escapedText + '">' +
                        '<span class="header-link"></span>' +
                        '</a>' + text +
                        '</h1><hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700">';
                }
                case 2: {
                    return `<h2 class="text-4xl font-bold dark:text-white mb-1  mt-10" data-id="${escapedText}">` +
                        '<a data-id="${escapedText}"  id="' + escapedText + '" class="anchor" href="#' + escapedText + '">' +
                        '<span class="header-link"></span>' +
                        '</a>' + text +
                        '</h2><hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700">';
                }
                case 3: {
                    return `<h3 class="text-3xl font-bold dark:text-white mb-3" data-id="${escapedText}">` +
                        '<a id="' + escapedText + '" class="anchor" href="#' + escapedText + '">' +
                        '<span class="header-link"></span>' +
                        '</a>' + text +
                        '</h3>';
                }
                case 4: {
                    return `<h4 class="text-2xl font-bold dark:text-white mb-1" id="${escapedText}">` +
                        '<a id="' + escapedText + '" class="anchor" href="#' + escapedText + '">' +
                        '<span class="header-link"></span>' +
                        '</a>' + text +
                        '</h4>';
                }
                default: {
                    return '<h' + level + ' id="' + escapedText + '" class="mb-2 font-bold tracking-tight text-gray-900 dark:text-white" name="' + escapedText + '">' +
                        '<a  class="anchor" href="#' + escapedText + '">' +
                        '<span class="header-link"></span>' +
                        '</a>' + text +
                        '</h' + level + '>';

                }

            }
        };
        this.mkds.renderer.paragraph = (text: string) => {
            const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
            return '<p class="text-gray-500 dark:text-gray-300 mb-3">' +
                text +
                '</p>';
        };
        this.mkds.renderer.list = (body, ordered, start) => {
            if (ordered) {
                return '<ol class="ps-5 mt-2 mb-2 space-y-1 list-decimal list-inside text-gray-700 dark:text-gray-300">' +
                    body +
                    '</ol>';
            } else {
                return '<ul class="space-y-4 mb-2 text-gray-500 list-disc list-inside dark:text-gray-300">' +
                    body +
                    '</ul>';
            }
        };
        this.mkds.renderer.listitem = (text, task, checked) => {
            return '<li class="ps-5 mt-2 space-y-1 list-decimal list-inside">' +
                text +
                '</li>';
        };
        this.mkds.renderer.link = (href, title, text) => {
            return `<a href=${href} title=${title} class="font-medium text-blue-600 underline dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:no-underline">${text}</a>`;
        };

        this.mkds.renderer.strong = (text) => {
            return `<span class="font-semibold text-gray-900 dark:text-white">${text}</span>`;
        };
        this.mkds.renderer.image = (href, title, text) => {
            return `<img src="${href}" class="w-full h-auto max-w-xl rounded-lg" alt="image description">`;
        };
        this.mkds.renderer.blockquote = (quote) => {
            return `
            <blockquote class="p-4 my-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
    <p class="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">${quote}</p>
</blockquote>`;
        };
        this.mkds.renderer.codespan = (quote) => {
            return `<span class="bg-gray-100 text-gray-800 text-sm font-medium px-1 font-semibold
 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">${quote}</span>`;
        };
    }

}


