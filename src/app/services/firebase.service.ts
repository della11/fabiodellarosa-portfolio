import { inject, Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private db = inject(AngularFirestore);
  private storage = inject(AngularFireStorage);
  getAll(dbPath: string): AngularFirestoreCollection<any> {
    return this.getCollection(dbPath);
  }

  create(dbPath: string, obj: any): any {
    const collection = this.getCollection(dbPath);
    return collection.add({ ...obj });
  }

  update(id: string, dbPath: string, data: any): Promise<void> {
    const collection = this.getCollection(dbPath);
    return collection.doc(id).update(data);
  }

  delete(id: string, dbPath: string): Promise<void> {
    const collection = this.getCollection(dbPath);
    return collection.doc(id).delete();
  }

  getCollection = (dbPath: string): AngularFirestoreCollection<any> =>
    this.db.collection(dbPath);
}
