import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import {
  RequestListaFormularioResumoModel,
  ResponsePageOfListaFormularioResumoModel,
} from 'src/app/core/models/formulario-resumo.model';
import { listaFormulariosResumo } from 'src/app/core/services/formulario/mocks/lista-formulario-resumo.mock';
import { TabelaFormulariosComponent } from '../tabela-formularios/tabela-formularios.component';
import { ResultadoConsultaComponent } from './resultado-consulta.component';

@Component({
  selector: 'mat-icon',
  template: '<span></span>',
})
class MockMatIconComponent {
  @Input() svgIcon: any;
  @Input() fontSet: any;
  @Input() fontIcon: any;
}

describe('ResultadoConsultaComponent', () => {
  let component: ResultadoConsultaComponent;
  let fixture: ComponentFixture<ResultadoConsultaComponent>;
  let mockToastService: any;

  beforeEach(async () => {
    mockToastService = { error: jest.fn() };

    await TestBed.configureTestingModule({
      declarations: [ResultadoConsultaComponent, TabelaFormulariosComponent],
      imports: [
        ReactiveFormsModule,
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
      providers: [MatIconRegistry, { provide: ToastrService, useValue: mockToastService }],
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
    fixture = TestBed.createComponent(ResultadoConsultaComponent);
    component = fixture.componentInstance;

    component.PageOfListaFormularioResumo = {
      listaFormularios: listaFormulariosResumo,
      totalItems: 0,
      totalPages: 6,
      currentPage: 0,
      pageSize: 10,
      hasNextPage: true,
      hasPreviousPage: false,
    };

    component.FiltroListaFormularioResumo = {
      dataInicio: new Date(),
      dataFim: new Date(),
      dataCriacao: true,
      dataEnvio: true,
      tags: {
        nomeFormulario: 'default',
      },
      page: 0,
      pageSize: 10,
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set PageOfListaFormularioResumo input correctly', () => {
    const mockPageOfLista: ResponsePageOfListaFormularioResumoModel = {
      listaFormularios: listaFormulariosResumo,
      totalItems: 56,
      totalPages: 6,
      currentPage: 0,
      pageSize: 10,
      hasNextPage: true,
      hasPreviousPage: false,
    };

    component.PageOfListaFormularioResumo = mockPageOfLista;
    fixture.detectChanges();

    expect(component.PageOfListaFormularioResumo).toEqual(mockPageOfLista);
  });

  it('should set FiltroListaFormularioResumo input correctly', () => {
    const mockFiltroLista: RequestListaFormularioResumoModel = {
      dataInicio: new Date(),
      dataFim: new Date(),
      dataCriacao: true,
      dataEnvio: true,
      tags: {
        nomeFormulario: 'abracadabra',
      },
      page: 0,
      pageSize: 10,
    };

    component.FiltroListaFormularioResumo = mockFiltroLista;
    fixture.detectChanges();

    expect(component.FiltroListaFormularioResumo).toEqual(mockFiltroLista);
  });
});
