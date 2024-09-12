import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css'],
})
export class AddBlogComponent implements OnInit {
  addEditBlogForm!: FormGroup;
  tags: any[] = [];
  coverPhoto: any;
  @ViewChild('tagsInput') tagsInput!: ElementRef;
  flag: boolean = false;
  constructor(
    private fb: FormBuilder,
    private _toastrService: ToastrService,
    private _blogServie: BlogService
  ) {}
  ngOnInit(): void {
    this.addEditBlogForm = this.fb.group({
      title: ['Demo text'],
      author: new FormControl('Sandesh'),
      shortDesc: ['Hello this is short desc'],
      publishDate: [''],
      timeToRead: [23],
      coverPhoto: [''],
      trending: [true],
      tags: [['sdfsdf', 'fsdf', 'sdf', 'sdfds', 'fsd']],
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
    let value = inputValue?.target.value.length || undefined;
    if (value >= 1) {
      this.flag = false;
    }
    if (value >= 0 && !this.flag) {
      this.flag = value === 0 ? true : false;
      return;
    }

    if (typeof tag === 'number') {
      console.log('tag', tag);
      this.tags.splice(tag, 1);
      return;
    }
    let removeTagIndex = this.tags.indexOf(tag);
    console.log('remove index', removeTagIndex);
    this.tags.splice(removeTagIndex, 1);
    console.log('Tags array after removing tag', this.tags);
  }

  onAddEditFormSubmit() {
    let formData = new FormData();
    console.log('add edit form ', this.addEditBlogForm.value);
    delete this.addEditBlogForm.value['coverPhoto'];
    delete this.addEditBlogForm.value['tags'];
    this.tags.forEach((tag) => {
      formData.append('tags[]', tag);
    });
    formData.append('coverPhoto', this.coverPhoto);
    Object.entries(this.addEditBlogForm.value).forEach((entry: any) => {
      console.log(
        'entries of blog form==>>',
        entry[0],
        'entry 2===>>',
        entry[1]
      );
      let name = entry[0];
      let value = entry[1];
      formData.append(name, value);
    });

    console.log('form data is', formData);

    this._blogServie.addBlog(formData).subscribe({
      next: (data: any) => {
        this._toastrService.success('Blog added successfully...', 'Success');
      },
      error: (err) => {
        this._toastrService.error(err.message, 'Error');
      },
    });
  }
  onUploadCoverPhoto(event: any) {
    this.coverPhoto = event.target.files[0];
    // let formData = new FormData();
    // formData.append('picture', coverPhoto);
    // this.addEditBlogForm?.get('coverPhoto')?.setValue(coverPhoto);
  }

  // onGetTextEditorValue(event: any) {
  //   this.addEditBlogForm.get('shortDesc')?.setValue(event);
  // }
}
