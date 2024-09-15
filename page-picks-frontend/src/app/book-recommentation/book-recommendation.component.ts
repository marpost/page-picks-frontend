import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Book} from "../service/interface/book";
import {BookRecommendationService} from "../service/book-recommendation.service";
import {OwlOptions} from "ngx-owl-carousel-o";

@Component({
  selector: 'app-book-recommentation',
  templateUrl: './book-recommendation.component.html',
  styleUrls: ['./book-recommendation.component.scss']
})
export class BookRecommendationComponent implements OnInit {
  books: Book[] = [];
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


  constructor(private recommendationService: BookRecommendationService) { }

  ngOnInit(): void {
    this.recommendationService.getRecommendation().subscribe((books: Book[]) => {
      this.books = books;
    });
  }
}
