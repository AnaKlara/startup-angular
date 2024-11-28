import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { PerfisService } from 'src/app/core/services/perfis/perfis.service';
import { LoadingOverlayService } from 'src/app/shared/services/loading-overlay/loading-overlay.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { TabelaSolicitacoesComponent } from './tabela-solicitacoes.component';

describe('TabelaSolicitacoesComponent', () => {
  let component: TabelaSolicitacoesComponent;
  let fixture: ComponentFixture<TabelaSolicitacoesComponent>;
  const mockToastrService = { error: jest.fn() };
  const mockLoadingOverlayService = { setLoading: jest.fn() };
  const mockPerfisService = { getPaginaDeListaDeSolicitacoesResumidas: jest.fn() };
  const mockDialog = { open: jest.fn() };
  const mockRouter = { createUrlTree: jest.fn(), serializeUrl: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabelaSolicitacoesComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        SharedModule,
        MatSelectModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatTableModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatMenuModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        { provide: ToastrService, useValue: mockToastrService },
        { provide: LoadingOverlayService, useValue: mockLoadingOverlayService },
        { provide: PerfisService, useValue: mockPerfisService },
        { provide: MatDialog, useValue: mockDialog },
        { provide: Router, useValue: mockRouter },
        provideAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TabelaSolicitacoesComponent);
    component = fixture.componentInstance;
    component.paginaDeListaDeSolicitacoesResumidas = {
      listaSolicitacoesResumidas: [],
      filters: {
        search: '',
        perfilSede: true,
      },
      orderBy: 'nome',
      totalItems: 345,
      totalPages: 34,
      currentPage: 0,
      pageSize: 10,
      hasNextPage: true,
      hasPreviousPage: false,
      nextPage: 1,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with loading and set data source', () => {
    component.paginaDeListaDeSolicitacoesResumidas.listaSolicitacoesResumidas = [
      {
        codigo: '001',
        chave: 'FHF1',
        nome: 'Ana Clara Correa da Silva',
        lotacao: '1 batalhao',
        orgaos: [
          {
            codigo: '123',
            nome: 'nome de um orgao qualquer aqui',
          },
        ],
        solicitacoes: ['nome de uma solicitacao'],
      },
    ];
    component.ngOnInit();
    expect(component.dataSource).toBeInstanceOf(MatTableDataSource);
    expect(component.dataSource.data.length).toBe(1);
    expect(component.loading).toBe(false);
  });

  it('should toggle check all rows', () => {
    component.dataSource = new MatTableDataSource([
      { chave: '001', isChecked: false },
      { chave: '002', isChecked: false },
    ]);

    component.toggleCheckAllRows(true);
    component.dataSource.data.forEach(user => expect(user.isChecked).toBe(true));

    component.toggleCheckAllRows(false);
    component.dataSource.data.forEach(user => expect(user.isChecked).toBe(false));
  });

  it('should toggle individual row checkboxes', () => {
    const usuario = { chave: '001', isChecked: false };
    component.dataSource = new MatTableDataSource([usuario]);

    component.toggleCheckBox(usuario);
    expect(usuario.isChecked).toBe(true);

    component.toggleCheckBox(usuario);
    expect(usuario.isChecked).toBe(false);
  });

  it('should navigate to profile page when navigateToPerfilPage is called', () => {
    const mockChave = '001';
    const mockUrl = '/perfis/001';
    mockRouter.createUrlTree.mockReturnValue(mockUrl);
    mockRouter.serializeUrl.mockReturnValue(mockUrl);

    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);

    component.navigateToPerfilPage(mockChave);

    expect(mockRouter.createUrlTree).toHaveBeenCalledWith([`/perfis/${mockChave}`]);
    expect(openSpy).toHaveBeenCalledWith(mockUrl);
  });

  it('should apply filter to dataSource', () => {
    component.dataSource = new MatTableDataSource([
      { chave: '001', usuario: 'User A' },
      { chave: '002', usuario: 'User B' },
    ]);

    const event = { target: { value: 'user a' } } as unknown as Event;
    component.applyFilter(event);

    expect(component.dataSource.filter).toBe('user a');
    expect(component.dataSource.filteredData.length).toBe(1);
  });
});
