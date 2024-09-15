import { Component, OnInit } from '@angular/core';
import {BookRecommendationService} from "../service/book-recommendation.service";
import {Book} from "../service/interface/book";
import {Observable} from "rxjs";

@Component({
  selector: 'app-popular-books',
  templateUrl: './popular-books.component.html',
  styleUrls: ['./popular-books.component.scss']
})
export class PopularBooksComponent implements OnInit {
  popularBooks: Book[] = []; // Array to store the popular books

  constructor(private bookRecommendationService: BookRecommendationService) { }

  ngOnInit(): void {
    this.loadPopularBooks();
  }

  // Fetch and load the popular books
  loadPopularBooks(): void {
    this.bookRecommendationService.getMostPopularBooks().subscribe((books: Book[]) => {
      this.popularBooks = books; // Store the fetched books in the popularBooks array
    });
  }
}
