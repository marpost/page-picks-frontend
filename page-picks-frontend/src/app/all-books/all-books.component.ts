import { Component, OnInit } from '@angular/core';
import { BooksService } from '../service/books.service';
import { Book } from '../service/interface/book';
import { AddBookDialogComponent } from './add-book-dialog/add-book-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.scss']
})
export class AllBooksComponent implements OnInit {

  allBooks: Book[] = [];

  constructor(private bookService: BooksService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(){
    this.bookService.getBooks().subscribe(
      (response: Book[]) => {
        this.allBooks = response;
        console.log('Books fetched successfully:', this.allBooks);
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  editBook(book: Book){
    const dialogRef = this.dialog.open(AddBookDialogComponent, {
      width: '400px',
      panelClass: 'dialog-class',
      data:book,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    });
  }

  deleteBook(isbn: string){

    if (
      confirm(
        'Are you sure you want to delete the book with ISBN ' +
        isbn +
          '?'
      )
    ) {
      this.bookService.deleteBook(isbn).subscribe(
        () => {
          this.fetchData();
        },
        (error) => {
          console.log('An error occurred while deleting the book');
          console.error(error);
        }
      );
    }
  }

  viewBook(book: any) {
    this.router.navigate(['/book'], { queryParams: { isbn: book.isbn } });
  }
}


