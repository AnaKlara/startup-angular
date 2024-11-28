import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import {
  FormularioResumoModel,
  RequestListaFormularioResumoModel,
  ResponsePageOfListaFormularioResumoModel,
} from 'src/app/core/models/formulario-resumo.model';
import { FormulariosService } from 'src/app/core/services/formulario/formularios.service';
import { listaFormulariosResumo } from 'src/app/core/services/formulario/mocks/lista-formulario-resumo.mock';
import { LoadingOverlayService } from 'src/app/shared/services/loading-overlay/loading-overlay.service';
import { ConfirmarDownloadComponent } from '../modals/confirmar-download/confirmar-download.component';
import { TabelaFormulariosComponent } from './tabela-formularios.component';

@Component({
  selector: 'mat-icon',
  template: '<span></span>',
})
class MockMatIconComponent {
  @Input() svgIcon: any;
  @Input() fontSet: any;
  @Input() fontIcon: any;
}

describe('TabelaFormulariosComponent', () => {
  let component: TabelaFormulariosComponent;
  let fixture: ComponentFixture<TabelaFormulariosComponent>;
  let mockDialog: any;
  let mockFormulariosService: any;
  let mockToastService: any;

  beforeEach(async () => {
    mockDialog = { open: jest.fn() };
    mockFormulariosService = { getListaFormulariosResumo: jest.fn() };
    mockToastService = { error: jest.fn() };

    await TestBed.configureTestingModule({
      declarations: [TabelaFormulariosComponent],
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
      providers: [
        MatIconRegistry,
        { provide: MatDialog, useValue: mockDialog },
        { provide: FormulariosService, useValue: mockFormulariosService },
        { provide: ToastrService, useValue: mockToastService },
        { provide: LoadingOverlayService, useValue: {} },
      ],
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
    fixture = TestBed.createComponent(TabelaFormulariosComponent);
    component = fixture.componentInstance;

    component.PageOfListaFormularioResumo = {
      listaFormularios: [],
      totalItems: 0,
      totalPages: 0,
      currentPage: 0,
      pageSize: 10,
      hasNextPage: false,
      hasPreviousPage: false,
    };

    component.FiltroListaFormularioResumo = {
      dataInicio: new Date('2024-08-07T16:41:33.090Z'),
      dataFim: new Date('2024-08-07T16:41:33.090Z'),
      dataCriacao: true,
      dataEnvio: true,
      tags: {
        nomeFormulario: 'abracadabra',
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
      listaFormularios: [],
      totalItems: 0,
      totalPages: 0,
      currentPage: 0,
      pageSize: 10,
      hasNextPage: false,
      hasPreviousPage: false,
    };

    component.PageOfListaFormularioResumo = mockPageOfLista;
    fixture.detectChanges();

    expect(component.pageOfListaFormularioResumo).toEqual(mockPageOfLista);
  });

  it('should set FiltroListaFormularioResumo input correctly', () => {
    const mockFiltroLista: RequestListaFormularioResumoModel = {
      dataInicio: new Date('2024-08-07T16:41:33.090Z'),
      dataFim: new Date('2024-08-07T16:41:33.090Z'),
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

    expect(component.filtrosRequestFormularioResumo).toEqual(mockFiltroLista);
  });

  it('should generate data source from listaFormularios', () => {
    const mockFormularios: FormularioResumoModel[] = listaFormulariosResumo;
    component.generateDataSourceFromListaFormularios(mockFormularios);

    expect(component.dataSource instanceof MatTableDataSource).toBe(true);
    expect(component.dataSource.data.length).toBe(mockFormularios.length);
  });

  it('should toggle checkbox state', () => {
    const mockFormulario = { isChecked: false };
    component.toggleCheckBox(mockFormulario);

    expect(mockFormulario.isChecked).toBe(true);
  });

  it('should toggle all rows', () => {
    component.dataSource = new MatTableDataSource([{ isChecked: false }, { isChecked: false }]);
    component.toggleCheckAllRows(true);

    expect(component.checkAll).toBe(true);
    expect(component.dataSource.data.every((item) => item.isChecked)).toBe(true);
  });

  it('should open confirm download modal', () => {
    mockDialog.open.mockReturnValue({ componentInstance: { confirmarDownloadEE: of() } });
    component.openConfirmarDownloadModal();

    expect(mockDialog.open).toHaveBeenCalledWith(ConfirmarDownloadComponent, { width: '35rem', height: '12.25rem' });
  });

  it('should apply filter', () => {
    const event = { target: { value: 'test' } };
    component.dataSource = new MatTableDataSource([{ tipoDoFormulario: 'test' }, { tipoDoFormulario: 'nottest' }]);
    component.applyFilter(event as unknown as Event);

    expect(component.dataSource.filter).toBe('test');
  });

  it('should sort data', () => {
    const data = [{ tipoDoFormulario: 'B' }, { tipoDoFormulario: 'A' }];
    component.dataSource = new MatTableDataSource(data);

    const sort: Sort = { active: 'tipoDoFormulario', direction: 'asc' };
    component.sortData(sort);

    expect(component.dataSource.data[0].tipoDoFormulario).toBe('A');
    expect(component.dataSource.data[1].tipoDoFormulario).toBe('B');
  });

  it('should handle error on buscarListaFormularios', () => {
    mockFormulariosService.getListaFormulariosResumo.mockReturnValue(throwError(() => new Error('Error')));
    component.buscarListaFormularios(component.filtrosRequestFormularioResumo);

    expect(mockToastService.error).toHaveBeenCalledWith('Não foi possível buscar formulários');
  });
});
