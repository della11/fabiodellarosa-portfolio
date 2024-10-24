import { Component } from '@angular/core';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ClientComponent } from './client/client.component';

@Component({
  selector: 'fdr11-about',
  standalone: true,
  imports: [TestimonialComponent, ClientComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}
