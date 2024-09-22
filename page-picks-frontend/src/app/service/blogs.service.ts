import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Blog} from '../models/blog.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl = 'http://localhost:8080/api/blogs';

  constructor(private http: HttpClient) {
  }

  getAllBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.apiUrl}`);
  }

  updateBlog(id: number, blog: Blog): Observable<Blog> {
    return this.http.put<Blog>(`${this.apiUrl}/${id}`, blog);
  }

  deleteBlog(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getBlogById(id: string): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/${id}`);
  }
}
