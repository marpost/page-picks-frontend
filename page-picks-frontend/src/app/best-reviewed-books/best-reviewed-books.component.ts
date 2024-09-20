import { Component, OnInit } from '@angular/core';
import {Book} from "../service/interface/book";
import {BookRecommendationService} from "../service/book-recommendation.service";
import {OwlOptions} from "ngx-owl-carousel-o";

@Component({
  selector: 'app-best-reviewed-books',
  templateUrl: './best-reviewed-books.component.html',
  styleUrls: ['./best-reviewed-books.component.scss']
})
export class BestReviewedBooksComponent implements OnInit {
  bestReviewed: Book[] = [];
  customOptions: OwlOptions = {
    loop: true,
    stagePadding: 3,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay:true,
    navSpeed: 700,
    slideBy: 6,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      900: {
        items: 3
      },
      1200: {
        items: 6  // Show 6 items for larger screens
      }
    },
    nav: true
  };

  constructor(private bookRecommendationService: BookRecommendationService) {
  }

  ngOnInit(): void {
    this.loadPopularBooks();
  }

  loadPopularBooks(): void {
    this.bookRecommendationService.getBestRatedBooks().subscribe((books: Book[]) => {
      this.bestReviewed = books;
    });
  }
}
