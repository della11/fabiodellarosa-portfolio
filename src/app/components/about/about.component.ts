import { Component } from '@angular/core';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ClientComponent } from './client/client.component';
import { ServiceComponent } from './service/service.component';

@Component({
  selector: 'fdr11-about',
  standalone: true,
  imports: [TestimonialComponent, ClientComponent, ServiceComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}
