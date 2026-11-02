import { Component, inject, OnInit, signal } from '@angular/core';
import { TitlecasePipe } from '../../pipes/titlecase.pipe';
import { FirebaseService } from '../../services/firebase.service';
import { Observable } from 'rxjs';
import { Project } from '../../models/project';
import { Category } from '../../models/enums';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'fdr11-portfolio',
  standalone: true,
  imports: [TitlecasePipe, AsyncPipe],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent implements OnInit {
  private readonly firebaseService = inject(FirebaseService);
  projects: Project[] = [];
  imageCache: { [title: string]: Observable<string | null> } = {};

  categories: Category[] = [Category.ALL, Category.APP, Category.WEB_DEV];
  selectedCategory = signal<Category>(Category.ALL);
  isSelectListOpen: boolean = false;

  filterProjects(category: Category): void {
    this.selectedCategory.set(category);
  }

  toggleSelectList(): void {
    console.log('changeOpenClose', this.isSelectListOpen);
    this.isSelectListOpen = !this.isSelectListOpen;
  }

  selectCategory(category: Category): void {
    this.selectedCategory.set(category);
    this.isSelectListOpen = false;
  }

  getImage(title: string): Observable<string | null> {
    // Check if the image is already in the cache to avoid multiple requests
    if (!this.imageCache[title]) {
      this.imageCache[title] = this.firebaseService.getImage(title);
    }
    return this.imageCache[title];
  }

  ngOnInit(): void {
    this.firebaseService
      .getCollection('project')
      .subscribe((data: Project[]) => {
        this.projects = data;
        console.log(data);

        // Populate image cache for each service item
        data.forEach((service) => {
          this.imageCache[service.img] = this.getImage(service.img);
        });
      });
  }
}
