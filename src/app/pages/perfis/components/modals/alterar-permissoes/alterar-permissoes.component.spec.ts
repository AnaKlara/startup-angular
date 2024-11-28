import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';

import { InputListaPermissaoComponent } from '../../input-lista-permissao/input-lista-permissao.component';
import { AlterarPermissoesComponent } from './alterar-permissoes.component';

describe('AlterarPermissoesComponent', () => {
  let component: AlterarPermissoesComponent;
  let fixture: ComponentFixture<AlterarPermissoesComponent>;
  let mockDialogRef: jest.Mocked<MatDialogRef<AlterarPermissoesComponent>>;
  let toastService: jest.Mocked<ToastrService>;

  beforeEach(async () => {
    mockDialogRef = {
      close: jest.fn(),
    } as any;

    toastService = {
      error: jest.fn(),
      success: jest.fn(),
      warning: jest.fn(),
      info: jest.fn(),
    } as unknown as jest.Mocked<ToastrService>;

    await TestBed.configureTestingModule({
      declarations: [AlterarPermissoesComponent, InputListaPermissaoComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatSelectModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: ToastrService, useValue: toastService },
        provideAnimations(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarPermissoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit confirmarEE and close the dialog on confirmar()', () => {
    const emitSpy = jest.spyOn(component.confirmarEE, 'emit');

    component.confirmar();

    expect(emitSpy).toHaveBeenCalled();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should emit cancelarEE and close the dialog on cancelar()', () => {
    const emitSpy = jest.spyOn(component.cancelarEE, 'emit');

    component.cancelar();

    expect(emitSpy).toHaveBeenCalled();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should close the dialog on closeModal()', () => {
    component.closeModal();

    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
