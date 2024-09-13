import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit, AfterViewInit {
  tagColors: any[] = ['red', 'green', 'purple'];

  blogData: any[] = [];
  constructor(
    private _blogService: BlogService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.fetchBlogs();
  }

  chooseTagColor(): string {
    let index = Math.floor(Math.random() * this.tagColors.length);
    // console.log('index', index);
    return this.tagColors[index];
  }

  fetchBlogs() {
    this._blogService
      .fetchAllBlogs()
      .pipe(
        map((data: any) => {
          return data.result;
        }),
        map((blog: any) => {
          return blog.map((data: any) => {
            return {
              ...data,
              tags: data.tags.map((tag: any) => {
                let color = this.chooseTagColor();
                // console.log('color', color);
                return {
                  data: tag,
                  ngClasses: `ring-${color}-500/10 hover:font-bold bg-${color}-200  t ext-${color}-500 ring-inset ring-1`,
                };
              }),
            };
          });
        })
      )
      .subscribe({
        next: (data: any) => {
          // console.log('data from pipe===>>>', data);
          this.blogData = data;
          this._toastrService.success(
            'Success',
            'All blogs fetched successfully...'
          );
        },
        error: (err) => {
          this._toastrService.error(err.message, 'Error');
        },
      });
  }
}
