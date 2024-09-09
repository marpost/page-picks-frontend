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
    BookstoreComponent
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

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
