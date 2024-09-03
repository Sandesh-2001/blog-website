import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogsComponent } from './blogs.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [
    BlogsComponent,
    BlogListComponent,
    AddBlogComponent,
    BlogDetailComponent,
    TextEditorComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, BlogsRoutingModule, SharedModule],
})
export class BlogsModule {}
