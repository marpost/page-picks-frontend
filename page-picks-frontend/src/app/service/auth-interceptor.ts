import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, finalize, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor{
  private count = 0;

  constructor(
    private userService: AuthService
  ) {}


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.count === 0) {
      
    }

    this.count++;
    let clonedRequest = this.addAuthHeader(request);

    return next.handle(clonedRequest)
      .pipe(catchError(error => this.handleResponseError(error, request, next)))
      .pipe(finalize(() => {
        this.count--;
        if (this.count === 0) {
        }
      }));
  }

  accessToken = localStorage.getItem('authToken');

  addAuthHeader(request: HttpRequest<unknown>): HttpRequest<unknown> {
    let clonedRequest;

    if (this.accessToken) {
      clonedRequest = request.clone({ setHeaders: { Authorization: `Bearer ${this.accessToken}` } });
    } else {
      clonedRequest = request.clone();
    }

    return clonedRequest;
  }

  handleResponseError(error: any, request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('An error occurred. Please try again.');
    return throwError(() => new Error(error));
  }

}
