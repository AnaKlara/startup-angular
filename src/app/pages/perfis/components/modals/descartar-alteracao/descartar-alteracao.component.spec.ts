import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { jest } from '@jest/globals';

import { DescartarAlteracaoComponent } from './descartar-alteracao.component';

describe('DescartarAlteracaoComponent', () => {
  let component: DescartarAlteracaoComponent;
  let fixture: ComponentFixture<DescartarAlteracaoComponent>;
  let dialogRefSpy: jest.Mocked<MatDialogRef<DescartarAlteracaoComponent>>;

  beforeEach(async () => {
    dialogRefSpy = {
      close: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      declarations: [DescartarAlteracaoComponent],
      imports: [MatIconModule],
      providers: [{ provide: MatDialogRef, useValue: dialogRefSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescartarAlteracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit confirmarDescartarEE event and close the dialog when confirmarDescartar is called', () => {
    jest.spyOn(component.confirmarDescartarEE, 'emit');

    component.confirmarDescartar();

    expect(component.confirmarDescartarEE.emit).toHaveBeenCalled();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should emit cancelarDescartarEE event and close the dialog when cancelarDescartar is called', () => {
    jest.spyOn(component.cancelarDescartarEE, 'emit');

    component.cancelarDescartar();

    expect(component.cancelarDescartarEE.emit).toHaveBeenCalled();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should close the dialog when closeModal is called', () => {
    component.closeModal();

    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});
