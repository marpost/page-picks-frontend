import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserBookStatus} from "../models/userBookStatus.model";

@Injectable({
  providedIn: 'root'
})
export class UserBookStatusService {
  private apiUrl = 'http://localhost:8080/api/user-book-status';

  constructor(private http: HttpClient) {
  }

  saveUserBookStatus(userBookStatus: UserBookStatus): Observable<UserBookStatus> {
    return this.http.post<UserBookStatus>(`${this.apiUrl}/save`, userBookStatus);
  }

  getUserBookStatuses(userId: number): Observable<UserBookStatus[]> {
    return this.http.get<UserBookStatus[]>(`${this.apiUrl}/user/${userId}`);
  }

  addBookToRead(userId: number, bookIsbn: string): Observable<UserBookStatus> {
    const userBookStatus = {
      user: { id: userId }, 
      book: { isbn: bookIsbn },
      status: 'TO_READ',   
      currentPage: 0,
      rating: 0,
      review: '',
      favorite: false
    };
  
    return this.http.post<UserBookStatus>(`${this.apiUrl}/save`, userBookStatus);
  }
  

  updateFavorite(id: number, favorite: boolean): Observable<UserBookStatus> {
    return this.http.patch<UserBookStatus>(`${this.apiUrl}/updateFavorite/${id}`, favorite);
  }

  updateCurrentPage(id: number, newPage: number): Observable<UserBookStatus> {
    return this.http.patch<UserBookStatus>(`${this.apiUrl}/updatePage/${id}`, newPage);
  }

  markAsFinished(id: number, rating?: number, review?: string): Observable<UserBookStatus> {
    const body: any = {};
    if (rating !== undefined) {
      body.rating = rating;
    }
    if (review !== undefined) {
      body.review = review;
    }
    return this.http.patch<UserBookStatus>(`${this.apiUrl}/markAsFinished/${id}`, body);
  }

  getContinueReadingBook(): Observable<UserBookStatus> {
    return this.http.get<UserBookStatus>(`${this.apiUrl}/continue-reading`);
  }

  updateRating(id: number, rating: number): Observable<UserBookStatus> {
    return this.http.patch<UserBookStatus>(`${this.apiUrl}/updateRating/${id}`, rating);
  }

  updateReview(id: number, review: string): Observable<UserBookStatus> {
    return this.http.patch<UserBookStatus>(`${this.apiUrl}/updateReview/${id}`, review);
  }
}
