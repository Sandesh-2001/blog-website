import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css'],
})
export class AddBlogComponent implements OnInit {
  addEditBlogForm!: FormGroup;
  formData: FormData = new FormData();
  tags: any[] = [];
  @ViewChild('tagsInput') tagsInput!: ElementRef;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.addEditBlogForm = this.fb.group({
      title: [''],
      author: new FormControl(),
      shortDesc: [''],
      publishedDate: [''],
      timeToRead: [''],
      coverPhoto: [''],
      treanding: [''],
      tags: [],
    });
  }

  onAddTag(event: any) {
    this.tags.push(event.target.value);
    this.addEditBlogForm.get('tags')?.setValue(this.tags);
    this.tagsInput.nativeElement.value = '';
  }
  removeTag(tag: any) {
    let removeTagIndex = this.tags.indexOf(tag);
    console.log('remove index', removeTagIndex);
    this.tags.splice(removeTagIndex, 1);
    console.log('Tags array after removing tag', this.tags);
  }

  onAddEditFormSubmit() {
    console.log('add edit form value', this.addEditBlogForm.value);
  }
  onUploadCoverPhoto(event: any) {
    let coverPhoto = event.target.files[0];
    console.log('photo', event.target.files[0]);
    this.formData.append('picture', event.target.files[0]);
    setTimeout(() => {
      console.log('form data', this.formData);
    }, 1000);
    this.addEditBlogForm.get('coverPhoto')?.setValue(this.formData);
  }
}
