import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable, catchError, throwError, finalize} from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  private count = 0;

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let clonedRequest = this.addAuthHeader(request);

    this.count++;
    return next.handle(clonedRequest)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleResponseError(error, request, next)),
        finalize(() => {
          this.count--;
        })
      );
  }

  addAuthHeader(request: HttpRequest<unknown>): HttpRequest<unknown> {
    const accessToken = localStorage.getItem('authToken');
    let clonedRequest;

    if (accessToken) {
      clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log('Authorization header added:', `Bearer ${accessToken}`); // Debugging
    } else {
      clonedRequest = request.clone();
      console.warn('No token found, sending request without Authorization header');
    }

    return clonedRequest;
  }

  handleResponseError(error: HttpErrorResponse, request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.error('HTTP Error:', error);

    if (error.status === 401) {
      console.warn('User is not authorized, redirecting to login...');
    } else if (error.status === 403) {
      console.warn('User is forbidden from accessing this resource');
    }

    return throwError(() => new Error(error.message));
  }
}
