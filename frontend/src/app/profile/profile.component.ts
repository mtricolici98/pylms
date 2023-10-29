import {Component, OnInit} from '@angular/core';
import {StorageService} from '../_services/storage.service';
import {User} from "../models/user";
import {heroAcademicCap, heroPencilSquare} from "@ng-icons/heroicons/outline";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    currentUser?: User | null;

    constructor(private storageService: StorageService) {
    }

    ngOnInit(): void {
        this.currentUser = this.storageService.getUser();
    }

    protected readonly heroAcademicCap = heroAcademicCap;
    protected readonly heroPencilSquare = heroPencilSquare;
}
