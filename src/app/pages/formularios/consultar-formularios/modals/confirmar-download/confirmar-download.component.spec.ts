import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmarDownloadComponent } from './confirmar-download.component';

describe('ConfirmarDownloadComponent', () => {
  let component: ConfirmarDownloadComponent;
  let fixture: ComponentFixture<ConfirmarDownloadComponent>;
  let dialogRefMock: { close: jest.Mock };

  beforeEach(async () => {
    dialogRefMock = {
      close: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [ConfirmarDownloadComponent],
      providers: [{ provide: MatDialogRef, useValue: dialogRefMock }],
      imports: [NoopAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarDownloadComponent);
    component = fixture.componentInstance;
    component.confirmarDownloadEE = new EventEmitter<void>();
    component.cancelarDownloadEE = new EventEmitter<void>();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit confirmarDownloadEE and close the dialog on confirmarDownload', () => {
    const confirmarSpy = jest.spyOn(component.confirmarDownloadEE, 'emit');

    component.confirmarDownload();

    expect(confirmarSpy).toHaveBeenCalled();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  it('should emit cancelarDownloadEE and close the dialog on cancelarDownload', () => {
    const cancelarSpy = jest.spyOn(component.cancelarDownloadEE, 'emit');

    component.cancelarDownload();

    expect(cancelarSpy).toHaveBeenCalled();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  it('should close the dialog on closeModal', () => {
    component.closeModal();

    expect(dialogRefMock.close).toHaveBeenCalled();
  });
});
