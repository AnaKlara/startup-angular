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
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { PerfilResumoModel } from 'src/app/core/models/perfil.model';
import { ResponsePaginaDeListaDePerfisResumoEntity } from 'src/app/core/services/perfis/entities/perfil-resumo.entity';
import { PerfisService } from 'src/app/core/services/perfis/perfis.service';
import { LoadingOverlayService } from 'src/app/shared/services/loading-overlay/loading-overlay.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { TabelaPerfilComponent } from './tabela-perfil.component';

describe('TabelaPerfilComponent', () => {
  let component: TabelaPerfilComponent;
  let fixture: ComponentFixture<TabelaPerfilComponent>;
  let perfisServiceMock: any;
  let loadingOverlayServiceMock: any;
  let toastrServiceMock: any;
  let routerMock: any;
  let dialogMock: any;

  beforeEach(async () => {
    perfisServiceMock = {
      getPaginaDeListaDePerfisResumidos: jest.fn(),
    };

    loadingOverlayServiceMock = {
      setLoading: jest.fn(),
    };

    toastrServiceMock = {
      error: jest.fn(),
    };

    routerMock = {
      serializeUrl: jest.fn(),
      createUrlTree: jest.fn(),
    };

    dialogMock = {
      open: jest.fn(),
    };

    Object.defineProperty(window, 'open', {
      writable: true,
      value: jest.fn(), // Mock the function
    });

    await TestBed.configureTestingModule({
      declarations: [TabelaPerfilComponent],
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
      ],
      providers: [
        { provide: PerfisService, useValue: perfisServiceMock },
        { provide: LoadingOverlayService, useValue: loadingOverlayServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: MatDialog, useValue: dialogMock },
        provideAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TabelaPerfilComponent);
    component = fixture.componentInstance;
    component.paginaDeListaDePerfisResumidos = {
      listaPerfisResumidos: [],
      filters: { search: '' },
    } as unknown as ResponsePaginaDeListaDePerfisResumoEntity;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize dataSource and set loading to false after content init', () => {
    const mockProfiles: PerfilResumoModel[] = [
      { chave: '1', nome: 'Usuario 1' },
      { chave: '2', nome: 'Usuario 2' },
    ] as PerfilResumoModel[];

    component.paginaDeListaDePerfisResumidos.listaPerfisResumidos = mockProfiles;

    component.ngOnInit();
    expect(component.dataSource.data.length).toBe(2);
    expect(component.loading).toBe(false);
  });

  it('should return true if any user is selected', () => {
    component.dataSource = new MatTableDataSource([
      { chave: '1', isChecked: true },
      { chave: '2', isChecked: false },
    ]);
    expect(component.isAnyUserSelected).toBe(true);
  });

  it('should return the correct count of selected users', () => {
    component.dataSource = new MatTableDataSource([
      { chave: '1', isChecked: true },
      { chave: '2', isChecked: true },
      { chave: '3', isChecked: false },
    ]);
    expect(component.howManyUsersIsChecked).toBe(2);
  });

  it('should navigate to user profile page on navigateToPerfilPage', () => {
    const spy = jest.spyOn(routerMock, 'serializeUrl');
    const mockUrl = 'http://localhost/perfis/123';
    routerMock.serializeUrl.mockReturnValue(mockUrl);

    component.navigateToPerfilPage('123');
    expect(spy).toHaveBeenCalledWith(routerMock.createUrlTree(['/perfis/123']));
  });

  it('should apply a filter to the dataSource', () => {
    component.dataSource = new MatTableDataSource([
      { chave: '1', nome: 'Usuario 1' },
      { chave: '2', nome: 'Usuario 2' },
    ]);
    const event = { target: { value: 'usuario 1' } } as unknown as Event;
    component.applyFilter(event);
    expect(component.dataSource.filter).toBe('usuario 1');
  });

  it('should toggle the checkbox state for a user', () => {
    const user = { chave: '1', isChecked: false };
    component.dataSource = new MatTableDataSource([user]);

    component.toggleCheckBox(user);
    expect(user.isChecked).toBe(true);
  });

  // it('should handle page event and update profiles', () => {
  //   const event = { pageIndex: 1 };
  //   const spy = jest.spyOn(component, 'getListaDePerfis');

  //   component.handlePageEvent(event);
  //   expect(component.filtrosConsultaListaDePerfis.page).toBe(2); // pageIndex + 1
  //   expect(spy).toHaveBeenCalledWith(component.filtrosConsultaListaDePerfis);
  // });

  it('should show error when profile list retrieval fails', () => {
    perfisServiceMock.getPaginaDeListaDePerfisResumidos.mockReturnValue(throwError(() => new Error()));
    component.getListaDePerfis(component.filtrosConsultaListaDePerfis);

    expect(toastrServiceMock.error).toHaveBeenCalledWith('Não foi possível buscar os dados.');
  });
});
