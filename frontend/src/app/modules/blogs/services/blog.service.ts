import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from 'src/app/core/models/blog.model';
import { environment } from 'src/environment';
@Injectable({
  providedIn: 'root',
})
export class BlogService {
  API_URL = environment.API_URL;
  constructor(private _httpClient: HttpClient) {}

  addBlog(data: Blog) {
    return this._httpClient.post(`${this.API_URL}/blogs`, data);
  }

  fetchAllBlogs() {
    return this._httpClient.get(`${this.API_URL}/blogs`);
  }
}
