import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { Client } from '../../../models/client';
import { AsyncPipe } from '@angular/common';
import { Image } from '../../../models/image';
import { Observable } from 'rxjs';

@Component({
  selector: 'fdr11-client',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
})
export class ClientComponent implements OnInit {
  clientsImages: string[] = [];

  clientsImages$!: Observable<string | null>[];
  private firebaseService = inject(FirebaseService);

  ngOnInit(): void {
    this.firebaseService.getCollection('client').subscribe((data: Client[]) => {
      this.clientsImages = data.map((x) => x.title);
      console.log(this.clientsImages);

      this.clientsImages$ = this.clientsImages.map((title) =>
        this.getImage(title)
      );
    });
  }

  getImage(title: string): Observable<string | null> {
    return this.firebaseService.getImage(title);
  }
}
