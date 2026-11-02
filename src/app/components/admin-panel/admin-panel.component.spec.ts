import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { EMPTY } from 'rxjs';
import { FirebaseService } from '../../services/firebase.service';
import { ToastService } from '../../services/toast.service';
import { AdminPanelComponent } from './admin-panel.component';

describe('Certification admin form', () => {
  let component: AdminPanelComponent;
  let save: jasmine.Spy;
  let toast: jasmine.Spy;
  const pdf = new File(['%PDF-1.7'], 'certificate.pdf');

  beforeEach(() => {
    save = jasmine.createSpy('saveCertification').and.resolveTo();
    toast = jasmine.createSpy('showToast');
    TestBed.configureTestingModule({
      imports: [AdminPanelComponent],
      providers: [
        FormBuilder,
        { provide: FirebaseService, useValue: { saveCertification: save } },
        { provide: ToastService, useValue: { showToast: toast, toastState: EMPTY } },
      ],
    });
    component = TestBed.runInInjectionContext(() => new AdminPanelComponent());
    component.modelSelected = 'certification';
    component.onModelChange();
  });

  it('requires both a nonblank title and a PDF', async () => {
    component.form.patchValue({ title: 'Title' });
    await component.submitForm();
    component.form.patchValue({ title: '   ', pdf });
    await component.submitForm();
    expect(save).not.toHaveBeenCalled();
  });

  it('waits for persistence, prevents duplicate submissions and resets only on success', async () => {
    let finish!: () => void;
    save.and.returnValue(new Promise<void>((resolve) => finish = resolve));
    component.form.setValue({ title: 'Azure', pdf });
    const pending = component.submitForm();
    await component.submitForm();
    expect(save).toHaveBeenCalledOnceWith('Azure', pdf);
    expect(component.isSavingCertification).toBeTrue();
    expect(toast).not.toHaveBeenCalled();
    finish();
    await pending;
    expect(component.form.value).toEqual({ title: null, pdf: null });
    expect(component.isSavingCertification).toBeFalse();
    expect(toast).toHaveBeenCalledWith('Certificazione aggiunta', 'success', 3000);
  });

  it('keeps input available for retry after an error and never reports success', async () => {
    save.and.rejectWith(new Error('Permission denied'));
    component.form.setValue({ title: 'Azure', pdf });
    await component.submitForm();
    expect(component.form.value).toEqual({ title: 'Azure', pdf });
    expect(component.form.enabled).toBeTrue();
    expect(component.isSavingCertification).toBeFalse();
    expect(toast).toHaveBeenCalledOnceWith('Permission denied', 'error', 5000);
  });

  it('clears the required PDF when the file selection is cancelled', () => {
    component.form.patchValue({ title: 'Azure', pdf });
    component.onCertificationFileSelected({ target: { files: [] } } as unknown as Event);
    expect(component.form.invalid).toBeTrue();
  });

  it('submits through the rendered admin form and clears the native file input', async () => {
    const fixture = TestBed.createComponent(AdminPanelComponent);
    fixture.autoDetectChanges();
    await fixture.whenStable();
    const select: HTMLSelectElement = fixture.nativeElement.querySelector('select');
    select.value = 'certification';
    select.dispatchEvent(new Event('change'));
    await fixture.whenStable();
    const title: HTMLInputElement = fixture.nativeElement.querySelector('#certification-title');
    title.value = 'Azure';
    title.dispatchEvent(new Event('input'));
    const input: HTMLInputElement = fixture.nativeElement.querySelector('#certification-pdf');
    const files = new DataTransfer();
    files.items.add(pdf);
    input.files = files.files;
    input.dispatchEvent(new Event('change'));
    await fixture.whenStable();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBeFalse();
    button.click();
    await fixture.whenStable();
    expect(save).toHaveBeenCalledOnceWith('Azure', pdf);
    expect(input.files?.length).toBe(0);
    expect(title.value).toBe('');
    expect(button.disabled).toBeTrue();
  });
});
