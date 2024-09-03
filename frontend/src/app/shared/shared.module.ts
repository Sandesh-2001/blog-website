import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckEmptyPipe } from './pipes/check-empty.pipe';

@NgModule({
  declarations: [CheckEmptyPipe],
  imports: [CommonModule],
  exports: [CheckEmptyPipe],
})
export class SharedModule {}
