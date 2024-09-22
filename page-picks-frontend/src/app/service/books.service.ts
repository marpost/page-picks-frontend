import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private baseUrl = 'http://localhost:8080/api/books';
  private bookReviewsUrl = 'http://localhost:8080/api/user-book-status/book';

  constructor(private http: HttpClient) {
  }

  copyBook(book1: any, book2: any) {
    book1.isbn = book2.isbn;
    book1.title = book2.title;
    book1.author = book2.author;
    book1.genre = book2.genre;
    book1.description = book2.description;
    book1.imageUrl = book2.imageUrl;
    book1.publisher = book2.publisher;
    book1.pageCount = book2.pageCount;
    book1.userStatuses = book2.userStatuses;
    book1.userStatuses = book2.userStatuses;

    return book1;
  }

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl)
  }

  saveBook(book: any) {
    const body = {
      isbn: book.isbn,
      title: book.title,
      author: book.author,
      genre: book.genre,
      description: book.description,
      imageUrl: book.imageUrl,
      publisher: book.publisher,
      pageCount: book.pageCount,
      userStatuses: book.userStatuses
    };

    return this.http.post<any>(`${this.baseUrl}/save`, body);
  }

  editBook(book: any, originalIsbn: string) {
    const body = {
      isbn: book.isbn,
      title: book.title,
      author: book.author,
      genre: book.genre,
      description: book.description,
      imageUrl: book.imageUrl,
      publisher: book.publisher,
      pageCount: book.pageCount,
      userStatuses: book.userStatuses
    };

    return this.http.put<any>(`${this.baseUrl}/${originalIsbn}/edit`, body);
  }

  getBookByIsbn(isbn: string) {
    const body = {
      isbn: isbn
    };

    return this.http.get<any>(`${this.baseUrl}/${isbn}`);
  }

  deleteBook(isbn: string) {
    return this.http.request('DELETE', `${this.baseUrl}/delete/${isbn}`);
  }

  searchBooks(title?: string, genre?: string, author?: string): Observable<any[]> {
    let params: any = {};

    if (title) params.title = title;
    if (genre) params.genre = genre;
    if (author) params.author = author;

    return this.http.get<any[]>(`${this.baseUrl}/search`, {params});
  }

  getAllAuthors(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/authors`);
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/categories`);
  }

  getReviewsForBook(isbn: string){
    return this.http.get<string[]>(`${this.bookReviewsUrl}/${isbn}/reviews`);
  }

}