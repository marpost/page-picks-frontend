import { Component, OnInit } from '@angular/core';
import {BookRecommendationService} from "../service/book-recommendation.service";
import {Book} from "../service/interface/book";

@Component({
  selector: 'app-popular-books',
  templateUrl: './popular-books.component.html',
  styleUrls: ['./popular-books.component.scss']
})
export class PopularBooksComponent implements OnInit {
  popularBooks: Book[] = [];

  constructor(private bookRecommendationService: BookRecommendationService) { }

  ngOnInit(): void {
    this.loadPopularBooks();
  }

  loadPopularBooks(): void {
    this.bookRecommendationService.getMostPopularBooks().subscribe((books: Book[]) => {
      this.popularBooks = books;
    });
  }
}
