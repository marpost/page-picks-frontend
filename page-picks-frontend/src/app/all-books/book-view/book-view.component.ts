import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/service/auth.service';
import { BooksService } from 'src/app/service/books.service';
import { UserBookStatusService } from 'src/app/service/user-book-status.service';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss']
})
export class BookViewComponent implements OnInit {
  book: any;
  reviews: any[] = [];
  user!: User;
  bookStatus: number = 1;
  bookIsbn: string = '';
  isFavorited: boolean = true;

  constructor(private route: ActivatedRoute, private booksService: BooksService, private authService: AuthService,
    private userBookStatusService: UserBookStatusService,
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.route.queryParams.subscribe(params => {
      const isbn = params['isbn'];
      if (isbn) {
        this.getBookByIsbn(isbn);
        this.bookIsbn = isbn;
      }
    });

    this.authService.getLoggedInUser().subscribe( result => {
      this.user = result
      this.updateButtonStatus();
      
    }
    )

  }

  updateButtonStatus(){
    this.userBookStatusService.getUserBookStatuses(this.user.id).subscribe(statuses => {
      const matchingStatus = statuses.find(status => status.book.isbn === this.bookIsbn);
      this.isFavorited = matchingStatus?.favorite? true:false;

      if (matchingStatus) {
        if (matchingStatus.status === 'TO_READ') {
          this.bookStatus = 2;
        } else if (matchingStatus.status === 'READING') {
          this.bookStatus = 3;
        } else if (matchingStatus.status === 'READ') {
          this.bookStatus = 4;
        } else {
          this.bookStatus = 1;
        }
      } else {
        this.bookStatus = 1;
      }
    }, error => {
      console.error('Error fetching user book statuses:', error);
      this.bookStatus = 1;
    });
  }

  getBookByIsbn(isbn: string): void {
    this.booksService.getBookByIsbn(isbn).subscribe(
      (book) => {
        this.book = book;
        this.booksService.getReviewsForBook(book.isbn).subscribe(
          (reviews: any) => {
            this.reviews = reviews;
            console.log('a', this.reviews)
            this.reviews = reviews.filter(
              (review: { review: string; rating: number; username: string }) => 
                !(review.review === '' && (review.rating === null || review.rating === 0))
            );
            
          },
          (error) => {
            console.error('Error fetching reviews:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching book:', error);
      }
    );
  }

  addBookToRead(isbn: string) {
    this.userBookStatusService.addBookToRead(this.user.id, isbn).subscribe(
      result =>
        this.bookStatus = 2
    );
  }  

  toggleFavorite() {
    this.isFavorited = !this.isFavorited;

    this.userBookStatusService.getUserBookStatuses(this.user.id).subscribe(statuses => {
      const matchingStatus = statuses.find(status => status.book.isbn === this.bookIsbn);
  
      if (matchingStatus) {
        this.userBookStatusService.updateFavorite(matchingStatus.id, this.isFavorited).subscribe(
          (updatedStatus) => {
            console.log('Favorite status updated successfully:', updatedStatus);
          },
          (error) => {
            console.error('Error updating favorite status:', error);
          }
        );
      } else {
        console.error('No matching status found for this book.');
      }
    }, error => {
      console.error('Error fetching user book statuses:', error);
    });
  }
  
}
