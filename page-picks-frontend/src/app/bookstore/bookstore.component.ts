import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBookDialogComponent } from '../all-books/add-book-dialog/add-book-dialog.component';
import { AllBooksComponent } from '../all-books/all-books.component';
import {BooksService} from "../service/books.service";

@Component({
  selector: 'app-bookstore',
  templateUrl: './bookstore.component.html',
  styleUrls: ['./bookstore.component.scss']
})
export class BookstoreComponent implements OnInit {
  title: string = '';
  genre: string = '';
  author: string = '';
  allBooks: any[] = [];
  genres: string[] = [];
  authors: string[] = [];

  constructor(public dialog: MatDialog, private bookService: BooksService) {}

  ngOnInit(): void {
    this.loadGenresAndAuthors();
    this.fetchAllBooks();
  }

  @ViewChild(AllBooksComponent) allBooksComponent!: AllBooksComponent;

  openAddBookDialog(): void {
    const dialogRef = this.dialog.open(AddBookDialogComponent, {
      width: '400px',
      panelClass: 'dialog-class'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchAllBooks();
      }
    });
  }

  searchBooks(): void {
    this.bookService.searchBooks(this.title, this.genre, this.author).subscribe(
      (books) => {
        this.allBooks = books;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  fetchAllBooks(): void {
    this.bookService.getBooks().subscribe((books) => {
      this.allBooks = books;
    });
  }

  loadGenresAndAuthors(): void {
    this.bookService.getAllCategories().subscribe((categories) => {
      this.genres = categories;
    });

    this.bookService.getAllAuthors().subscribe((authors) => {
      this.authors = authors;
    });
  }
}
