import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  isOpenSidebar: boolean = false;
  openProfileMenu: boolean = false;

  onOpenProfileMenu() {
    this.openProfileMenu = !this.openProfileMenu;
  }
}
