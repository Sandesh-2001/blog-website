import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css'],
})
export class AddBlogComponent implements OnInit {
  addEditBlogForm!: FormGroup;
  tags: any[] = [];
  @ViewChild('tagsInput') tagsInput!: ElementRef;
  flag: boolean = false;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.addEditBlogForm = this.fb.group({
      title: [''],
      author: new FormControl(),
      shortDesc: [''],
      publishDate: [''],
      timeToRead: [''],
      coverPhoto: [''],
      treanding: [''],
      tags: [],
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
    console.log('add edit form ', this.addEditBlogForm.value);
  }
  onUploadCoverPhoto(event: any) {
    let formData: FormData = new FormData();
    let coverPhoto = event.target.files[0];
    formData.append('picture', coverPhoto);
    this.addEditBlogForm.get('coverPhoto')?.setValue(formData.get('picture'));
  }

  // onGetTextEditorValue(event: any) {
  //   this.addEditBlogForm.get('shortDesc')?.setValue(event);
  // }
}
