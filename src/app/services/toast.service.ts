import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new Subject<{
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    duration?: number;
  }>();
  toastState = this.toastSubject.asObservable();

  showToast(
    message: string,
    type: 'success' | 'error' | 'info' | 'warning',
    duration: number = 3000
  ) {
    this.toastSubject.next({ message, type, duration });
  }
}
