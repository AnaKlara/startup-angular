import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { ResponsePageOfListaFormularioResumoModel } from 'src/app/core/models/formulario-resumo.model';
import { FormulariosService } from 'src/app/core/services/formulario/formularios.service';
import { TabelaFormulariosComponent } from '../tabela-formularios/tabela-formularios.component';
import { UltimosFormulariosComponent } from './ultimos-formularios.component';

@Component({
  selector: 'mat-icon',
  template: '<span></span>',
})
class MockMatIconComponent {
  @Input() svgIcon: any;
  @Input() fontSet: any;
  @Input() fontIcon: any;
}

describe('UltimosFormulariosComponent', () => {
  let component: UltimosFormulariosComponent;
  let fixture: ComponentFixture<UltimosFormulariosComponent>;
  let mockFormulariosService: any;
  let mockToastService: any;

  beforeEach(async () => {
    mockFormulariosService = {
      getListaFormulariosResumo: jest.fn().mockReturnValue(of({ listaFormularios: [] })),
    };
    mockToastService = { error: jest.fn() };

    await TestBed.configureTestingModule({
      declarations: [UltimosFormulariosComponent, TabelaFormulariosComponent],
      imports: [
        MatTabsModule,
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
        { provide: FormulariosService, useValue: mockFormulariosService },
        { provide: ToastrService, useValue: mockToastService },
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
    fixture = TestBed.createComponent(UltimosFormulariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call buscarListaFormularios on initialization', () => {
    expect(mockFormulariosService.getListaFormulariosResumo).toHaveBeenCalledTimes(2);
    expect(mockFormulariosService.getListaFormulariosResumo).toHaveBeenCalledWith(component.filtroFormulariosEmEdicao);
    expect(mockFormulariosService.getListaFormulariosResumo).toHaveBeenCalledWith(component.filtroFormulariosEntregues);
  });

  it('should set pageOfListaDeFormulariosEmEdicao correctly', () => {
    const mockResponse: ResponsePageOfListaFormularioResumoModel = {
      listaFormularios: [],
      totalItems: 0,
      totalPages: 0,
      currentPage: 0,
      pageSize: 10,
      hasNextPage: false,
      hasPreviousPage: false,
    };
    mockFormulariosService.getListaFormulariosResumo.mockReturnValue(of(mockResponse));

    component.buscarListaFormularios();
    fixture.detectChanges();

    expect(component.pageOfListaDeFormulariosEmEdicao).toEqual(mockResponse);
  });

  it('should set pageOfListaDeFormulariosEntregues correctly', () => {
    const mockResponse: ResponsePageOfListaFormularioResumoModel = {
      listaFormularios: [],
      totalItems: 0,
      totalPages: 0,
      currentPage: 0,
      pageSize: 10,
      hasNextPage: false,
      hasPreviousPage: false,
    };
    mockFormulariosService.getListaFormulariosResumo.mockReturnValue(of(mockResponse));

    component.buscarListaFormularios();
    fixture.detectChanges();

    expect(component.pageOfListaDeFormulariosEntregues).toEqual(mockResponse);
  });
});
