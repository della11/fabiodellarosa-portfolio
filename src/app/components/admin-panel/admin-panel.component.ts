import { Project } from './../../models/project';
import { Blog } from './../../models/blog';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { Service } from '../../models/service';
import { ToastComponent } from '../shared/toast/toast.component';
import { ToastService } from '../../services/toast.service';
import { Client } from '../../models/client';
import { TitlecasePipe } from '../../pipes/titlecase.pipe';

// Complex Type Alias
enum FormsType {
  Blog = 'blog',
  Project = 'project',
  Service = 'service',

  Client = 'client',
}

@Component({
  selector: 'fdr11-admin-panel',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ToastComponent, TitlecasePipe],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
})
export class AdminPanelComponent implements OnInit {
  form!: FormGroup;

  toastMessage: string = '';
  toastType: 'success' | 'error' | 'info' | 'warning' = 'info';
  toastDuration: number = 3000;

  models: string[] = ['blog', 'project', 'service', 'client']; //TODO - Add missing  sections to forms - testimonials, education, experience,
  modelSelected: string | null = null;
  fb = inject(FormBuilder);
  firebaseService = inject(FirebaseService);
  toastService = inject(ToastService);
  // Definizione dei modelli di form
  formModels: Record<string, any> = {
    blog: {
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      img: ['', Validators.required],
      category: ['', Validators.required],
      link: ['', Validators.required],
      // imgSource: [''],
    },
    project: {
      title: ['', Validators.required],
      category: ['', Validators.required],
      img: ['', Validators.required],
      link: ['', Validators.required],
      // imgSource: [''],
    },
    service: {
      title: ['', Validators.required],
      description: ['', Validators.required],
      img: ['', Validators.required],
    },
    client: {
      title: ['', Validators.required],
    },
  };

  onModelChange() {
    console.log('changed');
    const modelConfig = this.formModels[this.modelSelected ?? 'blog'];
    console.log('selectedModel', this.modelSelected);
    console.log('modelConfig', modelConfig);
    this.form = this.fb.group(modelConfig);
  }

  submitForm() {
    if (this.form.valid) {
      console.log('Dati del Form:', this.form.value);

      let model = this.cast();

      console.log('Dati del Form cast:', model);
      if (model) {
        switch (model.type) {
          case FormsType.Blog:
            this.firebaseService.createDoc(
              model.value,
              'blog',
              model.value.title
            );
            break;
          case FormsType.Project:
            this.firebaseService.createDoc(
              model.value,
              'project',
              model.value.title
            );
            break;
          case FormsType.Client:
            this.firebaseService.createDoc(
              model.value,
              'client',
              model.value.title
            );
            break;
          case FormsType.Service:
            this.firebaseService.createDoc(
              model.value,
              'service',
              model.value.title
            );
            break;
        }
      }

      this.toastService.showToast('Dato Aggiunto', 'success', 3000);
    }
  }

  private cast = () => {
    switch (this.modelSelected) {
      case 'blog':
        return { type: FormsType.Blog, value: this.form.value as Blog };
      case 'project':
        return { type: FormsType.Project, value: this.form.value as Project };
      case 'service':
        return { type: FormsType.Service, value: this.form.value as Service };
      case 'client':
        return { type: FormsType.Client, value: this.form.value as Client };
      default:
        return;
    }
  };

  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  saveImage = () => {
    this.firebaseService.saveImage(
      this.selectedFile!,
      this.selectedFile?.name!
    );

    this.toastService.showToast('Image Upload', 'info', 300);
  };
  async loadImage() {
    const img = await this.firebaseService.getOptimizedImage(
      this.selectedFile?.name!,
      300,
      200
    );
    document.getElementById('imageContainer')?.appendChild(img);
  }
  upload(): void {
    if (this.selectedFile) {
      this.firebaseService
        .uploadFile(this.selectedFile, `uploads/${this.selectedFile.name}`)
        .subscribe();
    }
  }

  ngOnInit(): void {
    this.toastService.toastState.subscribe((toast) => {
      this.toastMessage = toast.message;
      this.toastType = toast.type;
      this.toastDuration = toast.duration || 3000;

      // Reset toast message after the duration
      setTimeout(() => (this.toastMessage = ''), this.toastDuration);
    });
  }
}
