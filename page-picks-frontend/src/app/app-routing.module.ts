import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import {ProfileComponent} from "./profile/profile.component";
import { BookViewComponent } from './all-books/book-view/book-view.component';
import { BookstoreComponent } from './bookstore/bookstore.component';
import {BlogListComponent} from "./blog-list/blog-list.component";
import {BlogDetailComponent} from "./blog-detail/blog-detail.component";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'bookstore', component: BookstoreComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'book', component: BookViewComponent },
      { path: 'blogs', component: BlogListComponent},
      { path: 'blogs/:id', component: BlogDetailComponent},
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
