import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { provideAnimations } from '@angular/platform-browser/animations';
import { jest } from '@jest/globals';
import { ToastrService } from 'ngx-toastr';

import { UploadableAreaComponent } from '../../uploadable-area/uploadable-area.component';
import { JustificarAlteracaoComponent } from './justificar-alteracao.component';

describe('JustificarAlteracaoComponent', () => {
  let component: JustificarAlteracaoComponent;
  let fixture: ComponentFixture<JustificarAlteracaoComponent>;
  let dialogRefSpy: jest.Mocked<MatDialogRef<JustificarAlteracaoComponent>>;
  let toastService: jest.Mocked<ToastrService>;

  beforeEach(async () => {
    dialogRefSpy = {
      close: jest.fn(),
    } as any;

    toastService = {
      error: jest.fn(),
      success: jest.fn(),
      warning: jest.fn(),
      info: jest.fn(),
    } as unknown as jest.Mocked<ToastrService>;

    await TestBed.configureTestingModule({
      declarations: [JustificarAlteracaoComponent, UploadableAreaComponent],
      imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatIconModule, MatFormFieldModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: ToastrService, useValue: toastService },
        provideAnimations(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JustificarAlteracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit confirmarEE event and close the dialog when confirmar is called', () => {
    jest.spyOn(component.confirmarEE, 'emit');

    component.confirmar();

    expect(component.confirmarEE.emit).toHaveBeenCalled();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should emit cancelarEE event and close the dialog when cancelar is called', () => {
    jest.spyOn(component.cancelarEE, 'emit');

    component.cancelar();

    expect(component.cancelarEE.emit).toHaveBeenCalled();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should close the dialog when closeModal is called', () => {
    component.closeModal();

    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should remove an anexo at the given index when removerAnexo is called', () => {
    const anexos = ['file1', 'file2', 'file3'];
    component.justificativa.get('anexos')?.setValue(anexos);

    component.removerAnexo(1); // Removes 'file2'

    const updatedAnexos = component.justificativa.get('anexos')?.value;
    expect(updatedAnexos).toEqual(['file1', 'file3']);
  });

  it('should return the correct length of comentario when comentarioLength is called', () => {
    component.justificativa.get('comentario')?.setValue('Test Comment');
    expect(component.comentarioLenth).toBe(12);
  });

  it('should return the correct value of anexos when anexosFormValue is called', () => {
    const anexos = ['file1', 'file2'];
    component.justificativa.get('anexos')?.setValue(anexos);

    expect(component.anexosFormValue).toEqual(anexos);
  });
});
