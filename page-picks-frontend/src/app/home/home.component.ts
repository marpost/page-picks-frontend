import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBookDialogComponent } from '../all-books/add-book-dialog/add-book-dialog.component';
import { AllBooksComponent } from '../all-books/all-books.component';
import {AuthService} from "../service/auth.service";
import {UserBookStatusService} from "../service/user-book-status.service";
import {UserBookStatus} from "../models/userBookStatus.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean = false;
  userName: string = '';
  continueReadingBook: UserBookStatus | null = null;

  constructor(public dialog: MatDialog,
              private authService: AuthService,
              private userBookStatusService: UserBookStatusService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();

    if (this.isAuthenticated) {
      this.authService.getLoggedInUser().subscribe(user => {
        this.userName = user.firstName;
      });


      this.userBookStatusService.getContinueReadingBook().subscribe(book => {
        this.continueReadingBook = book;
      });
    }
  }

  @ViewChild(AllBooksComponent) allBooksComponent!: AllBooksComponent;

  openAddBookDialog(): void {
    const dialogRef = this.dialog.open(AddBookDialogComponent, {
      width: '400px',
      panelClass: 'dialog-class'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.allBooksComponent.fetchData();
      }
    });
  }
}
