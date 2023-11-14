import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './components/home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {CourseOverviewComponent} from "./components/course-overview/course-overview.component";
import {LessonViewComponent} from "./components/lesson-view/lesson-view.component";

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'courses', component: HomeComponent},
    {path: 'course/:id', component: CourseOverviewComponent},
    {path: 'lesson/:id', component: LessonViewComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'profile', component: ProfileComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled'})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
