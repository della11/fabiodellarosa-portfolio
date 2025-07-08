import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, map, Observable, take } from 'rxjs';
import { Image } from '../models/image';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService<T> {
  private readonly firestore = inject(AngularFirestore);
  // private readonly storage = inject(AngularFireStorage);
  // Crea un documento con un ID specificato o uno generato automaticamente
  createDoc(data: T, path: string, id?: string): Promise<void> {
    const ref = id
      ? this.firestore.doc<T>(`${path}/${id}`)
      : this.firestore.collection<T>(path).doc();
    return ref.set(data);
  }

  // Ottieni un documento per ID
  getDoc(path: string, id: string): Observable<T | undefined> {
    return this.firestore.doc<T>(`${path}/${id}`).valueChanges();
  }

  // Ottieni tutti i documenti di una collezione
  getCollection(path: string): Observable<T[]> {
    return this.firestore.collection<T>(path).valueChanges();
  }

  // Aggiorna un documento per ID
  updateDoc(path: string, id: string, data: Partial<T>): Promise<void> {
    return this.firestore.doc<T>(`${path}/${id}`).update(data);
  }

  // Cancella un documento per ID
  deleteDoc(path: string, id: string): Promise<void> {
    return this.firestore.doc<T>(`${path}/${id}`).delete();
  }

  // uploadFile(file: File, filePath: string) {
  //   const fileRef = this.storage.ref(filePath);
  //   const task = this.storage.upload(filePath, file);
  //   return task
  //     .snapshotChanges()
  //     .pipe(
  //       finalize(() =>
  //         fileRef
  //           .getDownloadURL()
  //           .subscribe((url) => console.log('File available at', url))
  //       )
  //     );
  // }

  private convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }
  async saveImage(selectedFile: File, name: string): Promise<void> {
    if (selectedFile) {
      try {
        const base64Image = await this.convertToBase64(selectedFile);
        const imageData = base64Image.split(',')[1]; // Remove the "data:image/jpeg;base64," part
        await this.firestore
          .collection('images')
          .doc<Image>(name)
          .set({
            image: imageData,
            createdAt: new Date(),
          } as Image);
        console.log('Image saved to Firestore');
      } catch (error) {
        console.error('Error saving image:', error);
      }
    }
  }

  async getOptimizedImage(
    filePath: string,
    width: number | null,
    height: number | null
  ): Promise<HTMLImageElement> {
    const el = this.getDoc('images', filePath);
    var ext = filePath.split('.')[1];
    const img = new Image();

    return new Promise((resolve, reject) => {
      el.subscribe({
        next: (x) => {
          const elem = x as Image;
          if (!elem.image) {
            reject(new Error('File non trovato'));
            return;
          }

          // Imposta il base64 come sorgente dell'immagine
          img.src = `data:image/${ext};base64,${elem.image}`;
          img.width = width ?? 300; // Ottimizzazione
          img.height = height ?? 200; // Ottimizzazione
          resolve(img);
        },
        error: (err) => reject(err),
      });
    });
  }

  getImage(imageName: string): Observable<string | null> {
    return this.firestore
      .collection('images')
      .doc(imageName)
      .valueChanges()
      .pipe(
        map((imageDoc: any) => {
          return `data:image/${imageName.split('.')[1]};base64,${
            imageDoc.image
          }`; // Format base64 for image source
        })
      );
  }

  getImageSvg(imageName: string): Observable<string | null> {
    return this.firestore
      .collection('images')
      .doc(imageName)
      .valueChanges()
      .pipe(
        map((imageDoc: any) => {
          return `data:image/svg+xml;base64,${imageDoc.image}`; // Format base64 for image source
        })
      );
  }
}
