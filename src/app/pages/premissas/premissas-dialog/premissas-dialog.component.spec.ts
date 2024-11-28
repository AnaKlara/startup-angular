import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';

import { PremissasDialogComponent } from './premissas-dialog.component';

describe('PremissasDialogComponent', () => {
  let component: PremissasDialogComponent;
  let fixture: ComponentFixture<PremissasDialogComponent>;
  let dialogRef: { close: jest.Mock };
  beforeEach(async(() => {
    dialogRef = { close: jest.fn() };
    TestBed.configureTestingModule({
      declarations: [PremissasDialogComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: MatDialogRef<PremissasDialogComponent>,
          useValue: dialogRef,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremissasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('closeModal works', () => {
    const spy = jest.spyOn(dialogRef, 'close');
    component.closeModal();
    expect(component).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  });

  it('onFileSelected works', () => {
    const spy = jest.spyOn(console, 'log');
    const fileInput = { files: ['arquivo'] } as unknown as HTMLInputElement;
    component.onFileSelected(fileInput);
    expect(spy).toHaveBeenCalledWith('Selected File:', 'arquivo');
  });
});
