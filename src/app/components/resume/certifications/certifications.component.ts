import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { catchError, of } from 'rxjs';
import { Certification } from '../../../models/certification';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'fdr11-certifications',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.scss',
})
export class CertificationsComponent {
  loadFailed = false;
  readonly certifications$ = inject(FirebaseService<Certification>)
    .getCollection('certification')
    .pipe(
      catchError(() => {
        this.loadFailed = true;
        return of([]);
      })
    );
}
