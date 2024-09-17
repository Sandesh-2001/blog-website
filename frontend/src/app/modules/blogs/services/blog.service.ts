import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Blog } from 'src/app/core/models/blog.model';
import { environment } from 'src/environment';
@Injectable({
  providedIn: 'root',
})
export class BlogService {
  API_URL = environment.API_URL;
  constructor(private _httpClient: HttpClient) {}
  addBlog(data: any) {
    console.log('data in add blog', data);
    console.log(data.has('coverPhoto'));
    var headerOptions = {
      headers: new HttpHeaders({
        'Application-Type': 'multipart/form-data',
      }),
    };
    // var options = new RequestOptions({ headers: headers });
    return this._httpClient.post(`${this.API_URL}/blogs`, data);
  }

  fetchAllBlogs() {
    return this._httpClient.get(`${this.API_URL}/blogs`);
  }

  getBlogData(id: string) {
    return this._httpClient.get(`${this.API_URL}/blogs/${id}`);
  }
}
