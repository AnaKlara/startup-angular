import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormulariosService } from 'src/app/core/services/formulario/formularios.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { ConsultarFormulariosComponent } from './consultar-formularios.component';
import { ResultadoConsultaComponent } from './resultado-consulta/resultado-consulta.component';
import { TabelaFormulariosComponent } from './tabela-formularios/tabela-formularios.component';
import { UltimosFormulariosComponent } from './ultimos-formularios/ultimos-formularios.component';

@Component({
  selector: 'mat-icon',
  template: '<span></span>',
})
class MockMatIconComponent {
  @Input() svgIcon: any;
  @Input() fontSet: any;
  @Input() fontIcon: any;
}

const mockActivatedRoute = {
  params: {
    subscribe: jest.fn(),
  },
};

describe('ConsultarFormulariosComponent', () => {
  let component: ConsultarFormulariosComponent;
  let fixture: ComponentFixture<ConsultarFormulariosComponent>;
  let mockFormulariosService: any;
  let mockToastService: any;

  beforeEach(async () => {
    mockToastService = { error: jest.fn(), warning: jest.fn() };
    mockFormulariosService = { getListaFormulariosResumo: jest.fn() };

    await TestBed.configureTestingModule({
      declarations: [
        ConsultarFormulariosComponent,
        UltimosFormulariosComponent,
        ResultadoConsultaComponent,
        TabelaFormulariosComponent,
      ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        SharedModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatMenuModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        NoopAnimationsModule,
        MatFormField,
        ToastrModule.forRoot(),
      ],
      providers: [
        FormulariosService,

        { provide: ToastrService, useValue: mockToastService },
        MatIconRegistry,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
      schemas: [NO_ERRORS_SCHEMA], // Ignore template errors for simplicity
    })
      .overrideModule(MatIconModule, {
        remove: {
          declarations: [MatIcon],
          exports: [MatIcon],
        },
        add: {
          declarations: [MockMatIconComponent],
          exports: [MockMatIconComponent],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarFormulariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize searchControl with empty value', () => {
    expect(component.searchControl.value).toBe('');
  });

  it('should disable the consultar button if form is invalid', () => {
    expect(component.isButtonConsultarDisabled).toBeTruthy();
  });

  it('should maintain the consultar button disabled if no tag is given even with date values', () => {
    component.filtro.controls.dataInicio.setValue(new Date());
    component.filtro.controls.dataFim.setValue(new Date());
    component.filtro.updateValueAndValidity();
    fixture.detectChanges();
    expect(component.isButtonConsultarDisabled).toBeTruthy();
  });

  it('should call the search function on searchControl value change with debounce time', done => {
    jest.spyOn(component, 'search');
    component.searchControl.setValue('test');
    setTimeout(() => {
      expect(component.search).toHaveBeenCalledWith('test');
      done();
    }, 300);
  });

  it('should enable the consultar button if at least one tag is given plus dataInicio and dataFim value ', () => {
    component.filtro.reset();
    component.filtro.controls.dataInicio.setValue(new Date());
    component.filtro.controls.dataFim.setValue(new Date());
    component.filtro.controls.tags.controls.nomeArquivo.setValue('abracadabra');
    component.filtro.updateValueAndValidity();
    fixture.detectChanges();
    expect(component.isButtonConsultarDisabled).toBeFalsy();
  });

  it('should call buscarListaFormularios on clicouConsultar if form is valid', () => {
    component.filtro.controls.dataInicio.setValue(new Date());
    component.filtro.controls.dataFim.setValue(new Date());
    component.filtro.controls.tags.controls.nomeArquivo.setValue('abracadabra');
    component.filtro.updateValueAndValidity();
    jest.spyOn(component, 'buscarListaFormularios');
    component.clicouConsultar();
    expect(component.buscarListaFormularios).toHaveBeenCalled();
  });
});
