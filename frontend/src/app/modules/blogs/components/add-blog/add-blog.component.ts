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
    console.log('add edit form ', this.addEditBlogForm.value);
  }
  onUploadCoverPhoto(event: any) {
    let formData: FormData = new FormData();
    let coverPhoto = event.target.files[0];
    formData.append('picture', coverPhoto);
    this.addEditBlogForm.get('coverPhoto')?.setValue(formData.get('picture'));
  }

  onGetTextEditorValue(event: any) {
    console.log('text editor ', event);
  }
}
