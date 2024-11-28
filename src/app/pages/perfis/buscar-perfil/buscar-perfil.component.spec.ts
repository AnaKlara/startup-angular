import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { PerfisService } from 'src/app/core/services/perfis/perfis.service';
import { LoadingOverlayService } from 'src/app/shared/services/loading-overlay/loading-overlay.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { BuscarPerfilComponent } from './buscar-perfil.component';
import { FormularioQtdPipe } from './pipes/formulario-qtd/formulario-qtd.pipe';
import { OrgaoQtdPipe } from './pipes/orgao-qtd/orgao-qtd.pipe';
import { PerfilQtdPipe } from './pipes/perfil-qtd/perfil-qtd.pipe';
import { SolicitacaoQtdPipe } from './pipes/solicitacao-qtd/solicitacao-qtd.pipe';
import { TabelaPerfilComponent } from './tabela-perfil/tabela-perfil.component';
import { TabelaSolicitacoesComponent } from './tabela-solicitacoes/tabela-solicitacoes.component';

describe('BuscarPerfilComponent', () => {
  let component: BuscarPerfilComponent;
  let fixture: ComponentFixture<BuscarPerfilComponent>;

  const mockLoadingOverlayService = {
    setLoading: jest.fn(),
  };

  const mockToastrService = {
    error: jest.fn(),
    success: jest.fn(),
    warning: jest.fn(),
    info: jest.fn(),
  };

  const mockRouter = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatIconModule,
        MatFormFieldModule,
        SharedModule,
        MatTabsModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatButtonModule,
        MatTooltipModule,
        MatInputModule,
        RouterTestingModule,
        MatMenuModule,
        MatPaginatorModule,
        MatTabsModule,
        MatTableModule,
        MatCheckboxModule,
      ],
      declarations: [
        BuscarPerfilComponent,
        SolicitacaoQtdPipe,
        PerfilQtdPipe,
        OrgaoQtdPipe,
        FormularioQtdPipe,
        TabelaPerfilComponent,
        TabelaSolicitacoesComponent,
      ],
      providers: [
        FormBuilder,
        { provide: PerfisService },
        { provide: LoadingOverlayService, useValue: mockLoadingOverlayService },
        { provide: ToastrService, useValue: mockToastrService },
        Router,
        provideAnimations(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarPerfilComponent);
    component = fixture.componentInstance;

    // Initialize form controls if necessary
    component.filtrosConsultaListaDePerfis = new FormGroup({
      paginated: new FormControl(true),
      page: new FormControl(0),
      pageSize: new FormControl(10),
      orderBy: new FormControl('name'),
      filters: new FormGroup({
        search: new FormControl(''),
        perfilSede: new FormControl(true),
        tipoPerfil: new FormControl(['ADMINISTRADOR', 'EMISSOR', 'EDITOR', 'LEITOR']),
        lotacao: new FormControl(null),
        orgao: new FormControl(null),
        formulario: new FormControl(null),
      }),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should call getListaDePerfis method on Consultar button click', () => {
    jest.spyOn(component, 'getListaDePerfis');
    component.onConsultarButtonClick();
    expect(component.getListaDePerfis).toHaveBeenCalled();
  });

  it('should call resetarFiltros method', () => {
    jest.spyOn(component, 'resetarFiltros');
    component.resetarFiltros();
    expect(component.resetarFiltros).toHaveBeenCalled();
    expect(component.todosTiposDePerfis).toBe(true);
    expect(component.perfilAdm).toBe(false);
    expect(component.perfilEmi).toBe(false);
    expect(component.perfilEdt).toBe(false);
    expect(component.perfilLeitor).toBe(false);
  });
});
