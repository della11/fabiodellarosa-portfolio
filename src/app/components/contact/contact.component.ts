import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'fdr11-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  fb = inject(FormBuilder);

  contactForm = this.fb.group({
    fullname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Form Data:', this.contactForm.value);
      this.contactForm.reset();
    }
  }
}
