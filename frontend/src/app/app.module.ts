import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './components/home/home.component';
import {ProfileComponent} from './profile/profile.component';

import {httpInterceptorProviders} from './_helpers/http.interceptor';
import {CourseListComponent} from './components/course-list/course-list.component';
import {CourseItemLargeComponent} from './components/course-item-large/course-item-large.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {NgIconsModule} from "@ng-icons/core";
import {
    heroUsers,
    heroQuestionMarkCircle,
    heroAcademicCap,
    heroPencilSquare,
    heroUser, heroDocumentText
} from "@ng-icons/heroicons/outline";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        ProfileComponent,
        CourseListComponent,
        CourseItemLargeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
        }),
        NgIconsModule.withIcons({heroUsers, heroQuestionMarkCircle, heroAcademicCap, heroPencilSquare, heroUser, heroDocumentText}),
        // ToastrModule added
    ],
    providers: [httpInterceptorProviders],
    bootstrap: [AppComponent]
})
export class AppModule {
}
