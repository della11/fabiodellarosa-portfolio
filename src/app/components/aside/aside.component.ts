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

  navigateToGitHub() {
    window.open('https://github.com/della11', '_blank');
  }

  navigateToLinkedIn() {
    window.open('https://www.linkedin.com/in/fabio-della-rosa', '_blank');
  }

  navigateToInstagram() {
    window.open('https://www.instagram.com/fabiodellarosa_', '_blank');
  }
}
