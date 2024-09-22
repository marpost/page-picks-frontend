import { Component, OnInit } from '@angular/core';
import {BlogService} from "../service/blogs.service";
import {ActivatedRoute} from "@angular/router";
import {Blog} from "../models/blog.model";

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  blog: Blog | null = null;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {
  }

  ngOnInit(): void {
    const blogId = this.route.snapshot.paramMap.get('id');
    if (blogId) {
      this.blogService.getBlogById(blogId).subscribe(blog => {
        this.blog = blog;
      });
    }
  }
}
