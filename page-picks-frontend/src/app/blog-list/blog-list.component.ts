import {Component, OnInit} from '@angular/core';
import {Blog} from "../models/blog.model";
import {BlogService} from "../service/blogs.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  blogs: Blog[] = [];

  constructor(private blogService: BlogService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.fetchBlogs();
  }

  fetchBlogs(): void {
    this.blogService.getAllBlogs().subscribe((data: Blog[]) => {
      this.blogs = data;
    });
  }

  viewBlog(blogId: number): void {
    this.router.navigate(['/blogs', blogId]);
  }
}
