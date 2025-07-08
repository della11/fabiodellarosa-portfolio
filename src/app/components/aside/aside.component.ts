import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'fdr11-aside',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss',
})
export class AsideComponent implements OnInit {
  private readonly firebaseService = inject(FirebaseService);
  isActive: boolean = false;

  img$!: Observable<string | null>;
  toggleSidebar = () => (this.isActive = !this.isActive);

  navigateToGitHub = () => window.open('https://github.com/della11', '_blank');

  navigateToLinkedIn = () =>
    window.open('https://www.linkedin.com/in/fabio-della-rosa', '_blank');

  navigateToInstagram = () =>
    window.open('https://www.instagram.com/fabiodellarosa_', '_blank');

  // getImage = (): Observable<string | null> =>
  //   this.firebaseService.getImage('fabiodellarosa.png');

  ngOnInit(): void {
    this.img$ = this.firebaseService.getImage('fabiodellarosa.png');
  }
}
