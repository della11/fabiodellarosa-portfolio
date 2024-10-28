import { Component } from '@angular/core';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

@Component({
  selector: 'fdr11-blog',
  standalone: true,
  imports: [PageNotFoundComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {}
