import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CheatsheetService} from "../../_services/cheatsheet.service";
import {ToastrService} from "ngx-toastr";
import {AppModule} from "../../app.module";

class CheatsheetElement {

    code: string;
    title: string;
}

@Component({
    selector: 'app-cheatsheet',
    templateUrl: './cheatsheet.component.html',
    styleUrl: './cheatsheet.component.css'
})
export class CheatsheetComponent implements OnInit {

    cheatSheetElements: CheatsheetElement[];


    constructor(private css: CheatsheetService, private tostr: ToastrService) {
    }

    ngOnInit() {
        this.css.getAllElements().subscribe(
            {
                next: (data) => {
                    this.cheatSheetElements = data;
                },
                error: () => {
                    this.tostr.error("Could not load data... Contact the administrator.");
                }
            }
        );
    }

}
