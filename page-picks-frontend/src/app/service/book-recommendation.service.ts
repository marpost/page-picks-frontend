import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from "./interface/book";

@Injectable({
  providedIn: 'root'
})
export class BookRecommendationService {
  private apiUrl = 'http://localhost:8080/api/recommendation';

  constructor(private http: HttpClient) {
  }

  getRecommendation(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getMostPopularBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/popular`);
  }

  getBestRatedBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/best-rated`);
  }
}
