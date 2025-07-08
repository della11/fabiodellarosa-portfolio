import { Component, OnInit, inject } from '@angular/core';
import { Testimonial } from '../../../models/testimonial';
import { Observable } from 'rxjs';
import { FirebaseService } from '../../../services/firebase.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'fdr11-testimonial',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.scss',
})
export class TestimonialComponent implements OnInit {
  private readonly firebaseService = inject(FirebaseService);

  testimonials$!: Observable<Testimonial[] | null>;

  imageCache: { [title: string]: Observable<string | null> } = {};

  testimonials: Testimonial[] = [
    {
      title: 'Random User1',
      img: './assets/images/avatar-1.png',
      description: `TODODODODODODOODODODODOODODODODDODODO
      DO TODODODODODODOODODODODOODODODODDODODODO
      TODODODODODODOODODODODOODODODODDODODODO
      TODODODODODODOODODODODOODODODODDODODODO`,
      date: '14 June, 2021',
    },
    {
      title: 'Random Miller',
      img: './assets/images/avatar-2.png',
      description: `TODo dodo tada dished but controversial. We were very pleased
             with the work done. She has a lot of experience and is very concerned
             about the needs of client.`,
      date: '10 May, 2021',
    },
    {
      title: 'Emily evans',
      img: './assets/images/avatar-3.png',
      description: `Richard was hired to create a corporate identity. We were very pleased
             with the work done.`,
      date: '21 July, 2021',
    },
    {
      title: 'Henry william',
      img: './assets/images/avatar-4.png',
      description: `Richard was hired to create a corporate identity.`,
      date: '29 August, 2021',
    },
  ];

  selectedTestimonial: any = null;
  isModalOpen = false;

  openModal(testimonial: any) {
    this.selectedTestimonial = testimonial;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  ngOnInit() {
    this.firebaseService
      .getCollection('testimonial')
      .subscribe((data: Testimonial[]) => {
        this.testimonials = data;
        console.log(data);

        // Populate image cache for each service item
        data.forEach((testimonial) => {
          this.imageCache[testimonial.img] = this.getImage(testimonial.img);
        });
      });
  }

  getImage(title: string): Observable<string | null> {
    if (!this.imageCache[title]) {
      this.imageCache[title] = this.firebaseService.getImage(title);
    }
    return this.imageCache[title];
  }
}
