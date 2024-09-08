import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserBookStatus} from "../models/userBookStatus.model";

@Injectable({
  providedIn: 'root'
})
export class UserBookStatusService {
  private apiUrl = 'http://localhost:8080/api/user-book-status';

  constructor(private http: HttpClient) { }

  getUserBookStatuses(userId: number): Observable<UserBookStatus[]> {
    return this.http.get<UserBookStatus[]>(`${this.apiUrl}/user/${userId}`);
  }
}
