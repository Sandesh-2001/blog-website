import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error.component';
import { ErrorRoutingModule } from './error.routing.module';

@NgModule({
  declarations: [ErrorComponent,],
  imports: [CommonModule, ErrorRoutingModule],
})
export class ErrorModule {}
