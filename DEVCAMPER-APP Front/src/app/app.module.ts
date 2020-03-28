import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router'
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

const appRouters: Routes = [
  { path: '', component: BootcampsComponent },
  { path: 'bootcamps', component: BootcampsComponent },
  { path: 'bootcamp/:id', component: BootcampDetailComponent },
  { path: 'add_bootcamp', component: BootcampAddComponent },
  { path: 'login', component: LoginComponent }
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
    LoginComponent
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
