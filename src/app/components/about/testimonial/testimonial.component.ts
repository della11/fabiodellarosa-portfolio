import { Component } from '@angular/core';

@Component({
  selector: 'fdr11-testimonial',
  standalone: true,
  imports: [],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.scss',
})
export class TestimonialComponent {
  testimonials = [
    {
      name: 'Random User1',
      img: './assets/images/avatar-1.png',
      text: `TODODODODODODOODODODODOODODODODDODODO
      DO TODODODODODODOODODODODOODODODODDODODODO
      TODODODODODODOODODODODOODODODODDODODODO
      TODODODODODODOODODODODOODODODODDODODODO`,
      date: '14 June, 2021',
    },
    {
      name: 'Random Miller',
      img: './assets/images/avatar-2.png',
      text: `TODo dodo tada dished but controversial. We were very pleased
             with the work done. She has a lot of experience and is very concerned
             about the needs of client.`,
      date: '10 May, 2021',
    },
    {
      name: 'Emily evans',
      img: './assets/images/avatar-3.png',
      text: `Richard was hired to create a corporate identity. We were very pleased
             with the work done.`,
      date: '21 July, 2021',
    },
    {
      name: 'Henry william',
      img: './assets/images/avatar-4.png',
      text: `Richard was hired to create a corporate identity.`,
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
}
