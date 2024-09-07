import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from 'src/app/service/books.service';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss']
})
export class BookViewComponent implements OnInit {
  book: any;

  constructor(private route: ActivatedRoute, private booksService: BooksService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.route.queryParams.subscribe(params => {
      const isbn = params['isbn'];
      if (isbn) {
        this.getBookByIsbn(isbn);
      }
    });
  }

  getBookByIsbn(isbn: string): void {
    this.booksService.getBookByIsbn(isbn).subscribe(
      (book) => {
        this.book = book;
      },
      (error) => {
        console.error('Error fetching book:', error);
      }
    );
  }

}
