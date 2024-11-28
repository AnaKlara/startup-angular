import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { FormulariosService } from 'src/app/core/services/formulario/formularios.service';
import { FormularioResumo } from 'src/app/core/services/perfis/entities/perfil.entity';
import { SharedModule } from 'src/app/shared/shared.module';

import { InputChipsListaFormularioComponent } from './input-chips-lista-formulario.component';

describe('InputChipsListaFormularioComponent', () => {
  let component: InputChipsListaFormularioComponent;
  let fixture: ComponentFixture<InputChipsListaFormularioComponent>;
  let mockFormulariosService: jest.Mocked<FormulariosService>;
  let mockToastrService: jest.Mocked<ToastrService>;

  beforeEach(async () => {
    mockFormulariosService = {
      gelListaFormulariosAutocomplete: jest.fn(),
    } as unknown as jest.Mocked<FormulariosService>;

    mockToastrService = {
      error: jest.fn(),
      warning: jest.fn(),
    } as unknown as jest.Mocked<ToastrService>;

    await TestBed.configureTestingModule({
      declarations: [InputChipsListaFormularioComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatChipsModule,
        SharedModule,
        MatButtonModule,
      ],
      providers: [
        { provide: FormulariosService, useValue: mockFormulariosService },
        { provide: ToastrService, useValue: mockToastrService },
        provideAnimations(),
      ],
      schemas: [NO_ERRORS_SCHEMA], // To ignore external template dependencies
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputChipsListaFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test initialization and subscriptions
  it('should initialize the form controls', () => {
    const spy = jest.spyOn(component.formulariosArray.valueChanges, 'subscribe');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  // Test the writeValue method of ControlValueAccessor
  it('should correctly write value using writeValue()', () => {
    const mockValue: FormularioResumo[] = [{ codigo: '001', sigla: 'A', descricao: 'Form A' }];
    component.writeValue(mockValue);
    expect(component.formulariosArray.value).toEqual(mockValue);
  });

  // Test the searchFormulariosOptions() success
  it('should successfully search formularios options', () => {
    const mockResults = [{ codigo: '001', sigla: 'A', descricao: 'Form A' }];
    mockFormulariosService.gelListaFormulariosAutocomplete.mockReturnValue(of(mockResults));

    component.searchFormulariosOptions('test');
    expect(component.loadingAutocomplete).toBe(false);
    expect(component.formulariosAutocompleteOptions).toEqual(mockResults);
  });

  // Test searchFormulariosOptions() error handling
  it('should handle error when searching formularios options', () => {
    mockFormulariosService.gelListaFormulariosAutocomplete.mockReturnValue(throwError('error'));

    component.searchFormulariosOptions('test');
    expect(component.loadingAutocomplete).toBe(false);
    expect(mockToastrService.error).toHaveBeenCalledWith('Erro ao buscar formulários.');
  });

  // Test adding a new chip
  it('should add a new chip when option is selected', () => {
    const mockFormulario: FormularioResumo = { codigo: '001', sigla: 'A', descricao: 'Form A' };
    component.formulariosArray.setValue([]);

    component.onSelectedOptionEvent(mockFormulario);
    expect(component.formulariosArray.value).toContain(mockFormulario);
    expect(component.inputTextSearch.value).toBe('');
  });

  // Test trying to add a duplicate chip
  it('should not add duplicate chip and show a warning', () => {
    const mockFormulario: FormularioResumo = { codigo: '001', sigla: 'A', descricao: 'Form A' };
    component.formulariosArray.setValue([mockFormulario]);

    component.onSelectedOptionEvent(mockFormulario);
    expect(mockToastrService.warning).toHaveBeenCalledWith('Este formulário já foi inserido.');
  });

  // Test removing a chip
  it('should remove a chip', () => {
    const mockFormulario: FormularioResumo = { codigo: '001', sigla: 'A', descricao: 'Form A' };
    component.formulariosArray.setValue([mockFormulario]);

    component.remove(mockFormulario);
    expect(component.formulariosArray.value).toEqual([]);
  });

  // Test the ControlValueAccessor registerOnChange
  it('should correctly register onChange', () => {
    const fn = jest.fn();
    component.registerOnChange(fn);
    component.onChange([]);
    expect(fn).toHaveBeenCalledWith([]);
  });

  // Test the ControlValueAccessor registerOnTouched
  it('should correctly register onTouched', () => {
    const fn = jest.fn();
    component.registerOnTouched(fn);
    component.onTouched();
    expect(fn).toHaveBeenCalled();
  });
});
