import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ProfileComponent } from './profile/profile.component';
import { AllBooksComponent } from './all-books/all-books.component';
import { AddBookDialogComponent } from './all-books/add-book-dialog/add-book-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { AuthInterceptor } from './service/auth-interceptor';
import { BookViewComponent } from './all-books/book-view/book-view.component';
import { BookstoreComponent } from './bookstore/bookstore.component';
import { FilterByStatusPipe } from './filter-by-status.pipe';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import { PageUpdateDialogComponent } from './page-update-dialog/page-update-dialog.component';
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';
import { BookRecommendationComponent } from './book-recommentation/book-recommendation.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PopularBooksComponent } from './popular-books/popular-books.component';
import {MatCardModule} from "@angular/material/card";
import { BestReviewedBooksComponent } from './best-reviewed-books/best-reviewed-books.component';
import { EditReviewDialogComponent } from './edit-review-dialog/edit-review-dialog.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ContactComponent,
    NavbarComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
    ProfileComponent,
    AllBooksComponent,
    AddBookDialogComponent,
    BookViewComponent,
    BookstoreComponent,
    FilterByStatusPipe,
    PageUpdateDialogComponent,
    ReviewDialogComponent,
    BookRecommendationComponent,
    PopularBooksComponent,
    BestReviewedBooksComponent,
    EditReviewDialogComponent,
    BlogListComponent,
    BlogDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    CarouselModule,
    MatCardModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
