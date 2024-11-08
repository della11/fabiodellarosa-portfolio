import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fdr11-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent implements OnInit {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'info' | 'warning' = 'info';
  @Input() duration: number = 3000; // Duration in milliseconds

  isVisible = true;

  ngOnInit() {
    // Automatically close the toast after the duration
    setTimeout(() => (this.isVisible = false), this.duration);
  }

  closeToast() {
    this.isVisible = false;
  }

  get toastClass() {
    return {
      ' toast-success': this.type === 'success',
      ' toast-error': this.type === 'error',
      ' toast-info': this.type === 'info',
      ' toast-warning': this.type === 'warning',
    };
  }
}
