import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BootcampsComponent } from './bootcamps/bootcamps.component';
import { HeaderComponent } from './header/header.component';
import { BootcampListComponent } from './bootcamps/bootcamp-list/bootcamp-list.component';
import { BootcampDetailComponent } from './bootcamps/bootcamp-detail/bootcamp-detail.component';
import { BootcampAddComponent } from './bootcamps/bootcamp-add/bootcamp-add.component';
import { from } from 'rxjs';
import { CoursesComponent } from './courses/courses.component';
import { BootcampService } from './bootcamps/bootcamp.servies';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { CourseAddComponent } from './courses/course-add/course-add.component';
import { ReviewComponent } from './review/review.component';
import { ReviewAddComponent } from './review/review-add/review-add.component';
import { ReviewManageComponent } from './review/review-manage/review-manage.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { UpdatePasswordComponent } from './auth/update-password/update-password.component';
import { BootcampManageComponent } from './bootcamps/bootcamp-manage/bootcamp-manage.component';
import { DropdownMenuDirective } from './dropdown-menu.directive'
const appRouters: Routes = [

  { path: '', component: HomeComponent },
  { path: 'bootcamps', component: BootcampsComponent },
  { path: 'bootcamp/:id', component: BootcampDetailComponent },
  { path: 'add_bootcamp', component: BootcampAddComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'add_course', component: CourseAddComponent },
  { path: '*', component: HomeComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    BootcampsComponent,
    HeaderComponent,
    BootcampListComponent,
    BootcampDetailComponent,
    BootcampAddComponent,
    CoursesComponent,
    AuthComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    CourseAddComponent,
    ReviewComponent,
    ReviewAddComponent,
    ReviewManageComponent,
    ResetPasswordComponent,
    UpdatePasswordComponent,
    BootcampManageComponent,
    DropdownMenuDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRouters)

  ],
  providers: [BootcampService],
  bootstrap: [AppComponent]
})
export class AppModule { }
