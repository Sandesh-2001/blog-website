import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from './blogs.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
console.log('called');
const routes: Routes = [
  {
    path: 'blogs',
    component: BlogsComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: '',
      //   pathMatch: 'full',
      // },
      {
        path: '',
        component: BlogListComponent,
      },
      {
        path: 'add-blog',
        component: AddBlogComponent,
      },
      {
        path: 'blog-detail/:title',
        component: BlogDetailComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: 'blogs',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogsRoutingModule {}
