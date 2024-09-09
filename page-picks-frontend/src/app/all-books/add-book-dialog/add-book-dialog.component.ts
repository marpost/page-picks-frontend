import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BooksService } from 'src/app/service/books.service';
import { Book } from 'src/app/service/interface/book';

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
  styleUrls: ['./add-book-dialog.component.scss']
})
export class AddBookDialogComponent {
  book = {
    isbn: '',
    title: '',
    author: '',
    genre: '',
    description: '',
    imageUrl: '',
    publisher: '',
    pageCount: 0
  };

  mode = 'Add';
  originalIsbn = '';

  constructor(public dialogRef: MatDialogRef<AddBookDialogComponent>, private bookService: BooksService, 
    @Inject(MAT_DIALOG_DATA) public bookData: Book
  ) {
    if(bookData){
      this.mode = 'Edit';
      this.originalIsbn = bookData.isbn;
      this.book = this.bookService.copyBook(this.book, bookData);
      console.log('book deep',this.book)
    } 
  }

  onSubmit(): void {

    if(!this.isFormValid()){
      return;
    }

    if(this.mode === 'Add'){
      this.bookService.saveBook(this.book).subscribe((response) => {
        console.log(response);
        console.log('Book created successfully')
        this.dialogRef.close(true);
      },
      (error) => {
        console.log(error);
        console.log('Error creating book')
      });
    } else {
      this.bookService.editBook(this.book, this.originalIsbn).subscribe((response) => {
        console.log(response);
        console.log('Book edited successfully')
        this.dialogRef.close(true);
      },
      (error) => {
        console.log(error);
        console.log('Error editing book')
      });
    }

    this.dialogRef.close(this.book);
  }

  onCancel(): void {
    this.dialogRef.close();
  }


  private isFormValid(): boolean {
    return this.book.isbn.trim() !== '' &&
           this.book.title.trim() !== '' &&
           this.book.author.trim() !== '' &&
           this.book.genre.trim() !== '' &&
           this.book.description.trim() !== '' &&
          //  this.book.publisher.trim() !== '' &&
           this.book.pageCount > 0
  }
}
