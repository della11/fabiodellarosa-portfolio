import { Component } from '@angular/core';

@Component({
  selector: 'fdr11-aside',
  standalone: true,
  imports: [],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss',
})
export class AsideComponent {
  isActive: boolean = false;

  // Function to toggle the sidebar
  toggleSidebar() {
    this.isActive = !this.isActive;
  }
}
