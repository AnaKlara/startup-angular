import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { PerfisService } from 'src/app/core/services/perfis/perfis.service';

import { SelectCriadoPorComponent } from './select-criado-por.component';

describe('SelectCriadoPorComponent', () => {
  let component: SelectCriadoPorComponent;
  let fixture: ComponentFixture<SelectCriadoPorComponent>;
  let perfisService: PerfisService;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, MatSelectModule, MatInputModule, MatIconModule, MatFormFieldModule],
      declarations: [SelectCriadoPorComponent],
      providers: [
        { provide: PerfisService, useValue: { getPerfilByFormulario: jest.fn() } },
        { provide: ToastrService, useValue: { error: jest.fn(), warning: jest.fn() } },
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: SelectCriadoPorComponent,
          multi: true,
        },
        provideAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectCriadoPorComponent);
    component = fixture.componentInstance;
    perfisService = TestBed.inject(PerfisService);
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable control when no siglaFormulario is provided', () => {
    component.ngOnInit();
    expect(component.criadoPor.disabled).toBe(true);
  });

  it('should call writeValue and set control value', () => {
    const testValue = ['test1', 'test2'];
    component.writeValue(testValue);
    expect(component.criadoPor.value).toEqual(testValue);
  });

  it('should call registerOnChange', () => {
    const onChangeSpy = jest.fn();
    component.registerOnChange(onChangeSpy);

    const testValue = ['test1'];
    component.criadoPor.setValue(testValue as never[]);

    expect(onChangeSpy).toHaveBeenCalledWith(testValue);
  });

  it('should enable or disable control based on setDisabledState', () => {
    component.setDisabledState(true);
    expect(component.criadoPor.disabled).toBe(true);

    component.setDisabledState(false);
    expect(component.criadoPor.disabled).toBe(false);
  });

  it('should handle successful data fetch in buscarUsuariosPorSiglaDeFormulario', () => {
    const mockResponse = [{ value: 'value1', label: 'label1' }];
    perfisService.getPerfilByFormulario = jest.fn().mockReturnValue(of(mockResponse));

    component.buscarUsuariosPorSiglaDeFormulario('testSigla');
    expect(component.listaCriadoPor).toEqual([{ value: 'value1', viewValue: 'label1' }]);
    expect(component.criadoPor.enabled).toBe(true);
  });

  it('should handle error in buscarUsuariosPorSiglaDeFormulario', () => {
    perfisService.getPerfilByFormulario = jest.fn().mockReturnValue(throwError('Error'));

    component.buscarUsuariosPorSiglaDeFormulario('testSigla');
    expect(toastrService.error).toHaveBeenCalledWith('Erro ao buscar dados.');
  });

  it('should clear all created values on removeAllCriadorPor', () => {
    component.criadoPor.setValue(['test1', 'test2'] as never[]);
    const event = new Event('click');
    component.removeAllCriadorPor(event);

    expect(component.criadoPor.value).toEqual([]);
  });
});
