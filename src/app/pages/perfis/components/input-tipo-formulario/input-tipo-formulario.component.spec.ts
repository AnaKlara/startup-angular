import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { FormularioAutocompleteModel } from 'src/app/core/models/formulario-resumo.model';
import { FormulariosService } from 'src/app/core/services/formulario/formularios.service';

import { InputTipoFormularioComponent } from './input-tipo-formulario.component';

describe('InputTipoFormularioComponent', () => {
  let component: InputTipoFormularioComponent;
  let fixture: ComponentFixture<InputTipoFormularioComponent>;
  let mockFormulariosService: jest.Mocked<FormulariosService>;
  let mockToastrService: jest.Mocked<ToastrService>;

  beforeEach(async () => {
    mockFormulariosService = {
      gelListaFormulariosAutocomplete: jest.fn(),
    } as unknown as jest.Mocked<FormulariosService>;

    mockToastrService = {
      error: jest.fn(),
    } as unknown as jest.Mocked<ToastrService>;

    await TestBed.configureTestingModule({
      declarations: [InputTipoFormularioComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatButtonModule,
      ],
      providers: [
        { provide: FormulariosService, useValue: mockFormulariosService },
        { provide: ToastrService, useValue: mockToastrService },
        provideAnimations(),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTipoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize the form controls and subscribe to value changes', () => {
    const spy = jest.spyOn(component.searchFormulario.valueChanges, 'subscribe');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should correctly write value using writeValue()', () => {
    const mockFormulario: FormularioAutocompleteModel = { codigo: '001', sigla: 'A', descricao: 'Form A' };

    component.writeValue(mockFormulario);

    expect(component.listaFormularios).toContain(mockFormulario);
    expect(component.searchFormulario.value).toEqual(mockFormulario.sigla);
  });

  it('should successfully fetch formularios and stop loading', () => {
    const mockResponse = [{ codigo: '001', sigla: 'A', descricao: 'Form A' }];
    mockFormulariosService.gelListaFormulariosAutocomplete.mockReturnValue(of(mockResponse));

    component.buscarFormularios('test');
    expect(component.listaFormularios).toEqual(mockResponse);
    expect(component.loadingFormAutocomplete).toBe(false);
  });

  it('should handle error when fetching formularios', () => {
    mockFormulariosService.gelListaFormulariosAutocomplete.mockReturnValue(throwError('error'));

    component.buscarFormularios('test');
    expect(mockToastrService.error).toHaveBeenCalledWith('Não foi possível buscar lista de usuários');
    expect(component.loadingFormAutocomplete).toBe(true);
  });

  it('should handle option selection and update form control', () => {
    const mockFormulario: FormularioAutocompleteModel = { codigo: '001', sigla: 'A', descricao: 'Form A' };
    const mockEvent = {
      option: { value: mockFormulario },
    } as unknown as MatAutocompleteSelectedEvent;

    const onChangeSpy = jest.fn();
    component.registerOnChange(onChangeSpy);

    component.autocompleteSelectionChange(mockEvent);

    expect(onChangeSpy).toHaveBeenCalledWith(mockFormulario);
    expect(component.searchFormulario.value).toEqual(mockFormulario.sigla);
  });

  it('should correctly register onChange', () => {
    const fn = jest.fn();
    component.registerOnChange(fn);
    component.onChange({ codigo: '001', sigla: 'A', descricao: 'Form A' });
    expect(fn).toHaveBeenCalledWith({ codigo: '001', sigla: 'A', descricao: 'Form A' });
  });

  it('should correctly register onTouched', () => {
    const fn = jest.fn();
    component.registerOnTouched(fn);
    component.onTouched();
    expect(fn).toHaveBeenCalled();
  });
});
