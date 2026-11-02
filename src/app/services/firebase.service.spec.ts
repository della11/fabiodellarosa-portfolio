import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MAX_CERTIFICATION_PDF_SIZE } from '../models/certification';
import { FirebaseService } from './firebase.service';

describe('Certification persistence', () => {
  let service: FirebaseService<unknown>;
  let write: jasmine.Spy;
  let collection: jasmine.Spy;

  beforeEach(() => {
    write = jasmine.createSpy('set').and.resolveTo();
    collection = jasmine.createSpy('collection').and.returnValue({
      doc: () => ({ set: write }),
    });
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFirestore, useValue: { collection } }],
    });
    service = TestBed.inject(FirebaseService);
  });

  it('stores the title and original PDF together without using the title as an ID', async () => {
    const content = '%PDF-1.7\ncertificate';
    await service.saveCertification('  Azure / .NET  ', new File([content], 'azure.PDF'));
    expect(collection).toHaveBeenCalledWith('certification');
    expect(write).toHaveBeenCalledOnceWith({
      title: 'Azure / .NET', fileName: 'azure.PDF', pdf: btoa(content),
    });
  });

  it('rejects empty titles, oversized files and files renamed to PDF before writing', async () => {
    const pdf = new File(['%PDF-1.7'], 'certificate.pdf');
    await expectAsync(service.saveCertification('  ', pdf)).toBeRejected();
    await expectAsync(service.saveCertification('x'.repeat(201), pdf)).toBeRejected();
    await expectAsync(service.saveCertification('Title', new File(['%PDF-1.7'], 'file.txt'))).toBeRejected();
    await expectAsync(service.saveCertification('Title', new File(['hello'], 'file.pdf'))).toBeRejected();
    await expectAsync(service.saveCertification('Title', new File([], 'empty.pdf'))).toBeRejected();
    const oversized = new File([new Uint8Array(MAX_CERTIFICATION_PDF_SIZE + 1)], 'large.pdf');
    await expectAsync(service.saveCertification('Title', oversized)).toBeRejected();
    expect(write).not.toHaveBeenCalled();
  });

  it('allows the documented maximum size', async () => {
    const pdf = new File(['%PDF-', new Uint8Array(MAX_CERTIFICATION_PDF_SIZE - 5)], 'limit.pdf');
    await service.saveCertification('Title', pdf);
    expect(write).toHaveBeenCalled();
    expect(atob(write.calls.mostRecent().args[0].pdf).length).toBe(MAX_CERTIFICATION_PDF_SIZE);
  });

  it('propagates write failures so the admin can retry', async () => {
    write.and.rejectWith(new Error('Permission denied'));
    await expectAsync(service.saveCertification('Title', new File(['%PDF-1.7'], 'file.pdf')))
      .toBeRejectedWithError('Permission denied');
  });
});
