import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css'],
})
export class AddBlogComponent implements OnInit {
  addEditBlogForm!: FormGroup;
  tags: any[] = [];
  coverPhoto: any;
  isEditBlog: boolean = false;
  date: any;
  isLoading: boolean = false;
  router!: Router;
  blogId!: string;
  @ViewChild('tagsInput') tagsInput!: ElementRef;
  flag: boolean = false;
  constructor(
    private fb: FormBuilder,
    private _toastrService: ToastrService,
    private _blogService: BlogService,
    private _activatedRouter: ActivatedRoute
  ) {
    this.router = inject(Router);
  }
  ngOnInit(): void {
    this.addEditBlogForm = this.fb.group({
      title: [''],
      author: new FormControl(''),
      shortDesc: [''],
      publishDate: [''],
      timeToRead: [23],
      coverPhoto: [''],
      trending: [true],
      tags: [['sdfsdf', 'fsdf', 'sdf', 'sdfds', 'fsd']],
    });
    this._activatedRouter.params.subscribe((data) => {
      if (data && data['id']) {
        this.blogId = data['id'];
        this.getBlogData(this.blogId);
        this.isEditBlog = true;
      }
    });
  }

  getBlogData(id: string) {
    this._blogService.getBlogData(id).subscribe((data: any) => {
      console.log(
        'blog data',
        new Date(data.result['publishDate'])?.toISOString().split('T')[0]
      );
      this.tags = data.result['tags'];
      this.addEditBlogForm.patchValue({
        title: data.result['title'],
        author: data.result['author'],
        shortDesc: data.result['shortDesc'],
        timeToRead: data.result['timeToRead'],
        publishDate: new Date(data.result['publishDate'])
          ?.toISOString()
          .split('T')[0],
      });
    });
  }

  onAddTag(event: any): any {
    if (event.target.value.trim().length === 0) {
      console.log('add tag');
      return 'toastr => please add tag';
    }
    this.tags.push(event.target.value);
    this.addEditBlogForm.get('tags')?.setValue(this.tags);
    this.tagsInput.nativeElement.value = '';
  }
  changeFlag() {
    this.flag = false;
  }
  onRemoveTag(tag: string | number, inputValue?: any) {
    console.log('form value', this.addEditBlogForm);
    this.checkChangedControls(this.addEditBlogForm);

    let value = inputValue?.target.value.length || undefined;
    if (value >= 1) {
      this.flag = false;
    }
    if (value >= 0 && !this.flag) {
      this.flag = value === 0 ? true : false;
      return;
    }

    if (typeof tag === 'number') {
      this.tags.splice(tag, 1);
      this.addEditBlogForm.get('tags')?.setValue(this.tags);

      return;
    }
    let removeTagIndex = this.tags.indexOf(tag);

    this.tags.splice(removeTagIndex, 1);
    this.addEditBlogForm.get('tags')?.setValue(this.tags);
  }

  onAddFormSubmit() {
    this.isLoading = true;
    let formData = new FormData();
    delete this.addEditBlogForm.value['coverPhoto'];
    delete this.addEditBlogForm.value['tags'];
    this.tags.forEach((tag) => {
      formData.append('tags[]', tag);
    });
    formData.append('coverPhoto', this.coverPhoto);
    Object.entries(this.addEditBlogForm.value).forEach((entry: any) => {
      let name = entry[0];
      let value = entry[1];
      formData.append(name, value);
    });
    this._blogService.addBlog(formData).subscribe({
      next: (data: any) => {
        this._toastrService.success('Blog added successfully...', 'Success');
        this.router.navigate(['/blogs']);
        this.isLoading = false;
      },
      error: (err) => {
        this._toastrService.error(err.message, 'Error');
        setTimeout(() => {
          this.isLoading = false;
        }, 2000);
      },
    });
  }

  onEditFormSubmit() {
    this.isLoading = true;
    console.log('form value', this.addEditBlogForm);
    let payload = this.checkChangedControls(this.addEditBlogForm);
    this._blogService.editBlog(this.blogId, payload).subscribe({
      next: (data) => {
        console.log('data', data);
        this._toastrService.success('Blog edited successfully...', 'Success');
        this.router.navigate(['/blogs']);
      },
      error: (err) => {
        this._toastrService.error(err.message, 'Error');
      },
    });
    this.router.navigate(['/blogs']);
  }

 

  checkChangedControls(form: FormGroup) {
    let obj: any = {};
    Object.keys(form.controls).forEach((data) => {
      console.log(form.get(data)?.pristine);
      if (!form.get(data)?.pristine) {
        obj[data] = form.get(data)?.value || null;
      }
    });
    console.log('obj', obj);
    return obj;
  }

  onUploadCoverPhoto(event: any) {
    this.coverPhoto = event.target.files[0];
  }
}
