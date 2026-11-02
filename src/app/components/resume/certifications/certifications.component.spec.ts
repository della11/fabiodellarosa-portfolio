import { TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';
import { Certification } from '../../../models/certification';
import { FirebaseService } from '../../../services/firebase.service';
import { CertificationsComponent } from './certifications.component';

describe('Certifications in Resume', () => {
  let collection: jasmine.Spy;

  beforeEach(() => {
    collection = jasmine.createSpy('getCollection');
    TestBed.configureTestingModule({
      imports: [CertificationsComponent],
      providers: [{ provide: FirebaseService, useValue: { getCollection: collection } }],
    });
  });

  it('renders live additions as accessible links to the original PDF', async () => {
    const updates = new Subject<Certification[]>();
    collection.and.returnValue(updates);
    const fixture = TestBed.createComponent(CertificationsComponent);
    fixture.autoDetectChanges();
    updates.next([{ title: 'Azure', fileName: 'azure.pdf', pdf: btoa('%PDF-1.7') }]);
    await fixture.whenStable();
    const link: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
    expect(fixture.nativeElement.textContent).toContain('Azure');
    expect(link.download).toBe('azure.pdf');
    expect(link.href).toBe('data:application/pdf;base64,' + btoa('%PDF-1.7'));
    expect(link.getAttribute('aria-label')).toContain('Azure');
    fixture.destroy();
    expect(updates.observed).toBeFalse();
  });

  it('shows an empty state for a collection without certifications', async () => {
    collection.and.returnValue(of([]));
    const fixture = TestBed.createComponent(CertificationsComponent);
    fixture.autoDetectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('No certifications added yet.');
  });

  it('reports load failures separately from an empty collection', async () => {
    collection.and.returnValue(throwError(() => new Error('Permission denied')));
    const fixture = TestBed.createComponent(CertificationsComponent);
    fixture.autoDetectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('[role="alert"]').textContent)
      .toContain('Unable to load certifications.');
    expect(fixture.nativeElement.textContent).not.toContain('No certifications added yet.');
  });
});
