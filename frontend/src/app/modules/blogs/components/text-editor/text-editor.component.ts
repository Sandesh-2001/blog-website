import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css'],
})
export class TextEditorComponent {
  @Output('value') value = new EventEmitter();

  onChangeValue(event: any) {
    console.log('value', event.target.value);
    this.value.emit(event.target.value);
  }
}
