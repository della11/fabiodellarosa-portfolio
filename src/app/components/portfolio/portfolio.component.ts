import { Component } from '@angular/core';
import { TitlecasePipe } from '../../pipes/titlecase.pipe';

@Component({
  selector: 'fdr11-portfolio',
  standalone: true,
  imports: [TitlecasePipe],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent {
  categories: string[] = [
    'all',
    'web design',
    'applications',
    'web development',
  ];
  selectedCategory: string = 'all';
  isSelectListOpen: boolean = false;

  projects = [
    {
      title: 'Finance',
      category: 'web development',
      img: './assets/images/project-1.jpg',
    },
    {
      title: 'Orizon',
      category: 'web development',
      img: './assets/images/project-2.png',
    },
    {
      title: 'Fundo',
      category: 'web design',
      img: './assets/images/project-3.jpg',
    },
    {
      title: 'Brawlhalla',
      category: 'applications',
      img: './assets/images/project-4.png',
    },
    {
      title: 'DSM.',
      category: 'web design',
      img: './assets/images/project-5.png',
    },
    {
      title: 'MetaSpark',
      category: 'web design',
      img: './assets/images/project-6.png',
    },
    {
      title: 'Summary',
      category: 'web development',
      img: './assets/images/project-7.png',
    },
    {
      title: 'Task Manager',
      category: 'applications',
      img: './assets/images/project-8.jpg',
    },
    {
      title: 'Arrival',
      category: 'web development',
      img: './assets/images/project-9.png',
    },
  ];

  filterProjects(category: string): void {
    this.selectedCategory = category;
  }

  toggleSelectList(): void {
    this.isSelectListOpen = !this.isSelectListOpen;
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.isSelectListOpen = false;
  }
}
