import { Component, inject, OnInit } from '@angular/core';
import { TitlecasePipe } from '../../../pipes/titlecase.pipe';
import { Service } from '../../../models/service';
import { FirebaseService } from '../../../services/firebase.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'fdr11-service',
  standalone: true,
  imports: [TitlecasePipe, AsyncPipe],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss',
})
export class ServiceComponent implements OnInit {
  private readonly firebaseService = inject(FirebaseService);
  services: Service[] = [];
  imageCache: { [title: string]: Observable<string | null> } = {};

  ngOnInit(): void {
    this.firebaseService
      .getCollection('service')
      .subscribe((data: Service[]) => {
        this.services = data;
        console.log(data);

        // Populate image cache for each service item
        data.forEach((service) => {
          this.imageCache[service.img] = this.getImage(service.img);
        });
      });
  }

  getImage(title: string): Observable<string | null> {
    // Check if the image is already in the cache to avoid multiple requests
    if (!this.imageCache[title]) {
      this.imageCache[title] = this.firebaseService.getImageSvg(title);
    }
    return this.imageCache[title];
  }
}
