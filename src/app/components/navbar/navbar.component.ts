import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { ResumeComponent } from '../resume/resume.component';
import { TitlecasePipe } from '../../pipes/titlecase.pipe';
import { BlogComponent } from '../blog/blog.component';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';

@Component({
  selector: 'fdr11-navbar',
  standalone: true,
  imports: [
    AboutComponent,
    ContactComponent,
    PortfolioComponent,
    ResumeComponent,
    TitlecasePipe,
  ], // Assicurati che i componenti siano qui
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements AfterViewInit {
  vcr = viewChild('container', { read: ViewContainerRef });
  pages: string[] = ['about', 'resume', 'portfolio', 'blog', 'contact'];
  activePage: string = 'about'; // Pagina attiva inizialmente

  private cdr = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    this.loadPage(this.activePage);

    let x = localStorage.getItem('admin');
    if (x) this.pages = [...this.pages, 'admin'];

    this.cdr.detectChanges();
  }

  loadPage(page: string) {
    console.log('in load page', page);
    this.activePage = page;
    // Rimuovi tutti i componenti attivi
    if (this.vcr()) this.vcr()?.clear();

    this.vcr()?.createComponent(this.getComponent(page));
    console.log('component created');
  }

  private getComponent(page: string) {
    // Mappa le pagine ai componenti
    const components: { [key: string]: any } = {
      about: AboutComponent,
      resume: ResumeComponent,
      portfolio: PortfolioComponent,
      blog: BlogComponent,
      contact: ContactComponent,
      admin: AdminPanelComponent,
    };

    console.log(components[page]);
    return components[page];
  }
}
