import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { Notificacao } from 'src/app/core/services/perfis/entities/perfil.entity';
import { UsuariosService } from 'src/app/core/services/usuarios/usuarios.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { InputChipsListaFormularioComponent } from '../components/input-chips-lista-formulario/input-chips-lista-formulario.component';
import { InputListaNotificacaoComponent } from '../components/input-lista-notificacao/input-lista-notificacao.component';
import { InputTipoFormularioComponent } from '../components/input-tipo-formulario/input-tipo-formulario.component';
import { DescartarAlteracaoComponent } from '../components/modals/descartar-alteracao/descartar-alteracao.component';
import { CadastrarComponent } from './cadastrar.component';

describe('CadastrarComponent', () => {
  let component: CadastrarComponent;
  let fixture: ComponentFixture<CadastrarComponent>;
  let toastrs: jest.Mocked<ToastrService>;
  let usuariosService: jest.Mocked<UsuariosService>;

  beforeEach(() => {
    toastrs = {
      error: jest.fn(),
      warning: jest.fn(),
    } as unknown as jest.Mocked<ToastrService>;

    usuariosService = {
      gelListaUsuariosAutocomplete: jest.fn(),
    } as jest.Mocked<UsuariosService>;

    TestBed.configureTestingModule({
      declarations: [
        CadastrarComponent,
        InputListaNotificacaoComponent,
        InputListaNotificacaoComponent,
        DescartarAlteracaoComponent,
        InputChipsListaFormularioComponent,
        InputTipoFormularioComponent,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        SharedModule,
        MatSelectModule,
        MatTabsModule,
        MatButtonModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        { provide: ToastrService, useValue: toastrs },
        { provide: UsuariosService, useValue: usuariosService },
        { provide: MatDialog, useValue: {} },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '123' } },
          },
        },
        provideAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize breadcrumbItems correctly', () => {
    expect(component.breadcrumbItems.length).toBe(3);
    expect(component.breadcrumbItems[0].label).toBe('Início');
  });

  it('should trigger search method and handle results', () => {
    const mockResponse = [{ chave: '001', nome: 'John Doe', lotacao: 'Dept' }];
    usuariosService.gelListaUsuariosAutocomplete.mockReturnValue(of(mockResponse));

    component.search('John');

    expect(usuariosService.gelListaUsuariosAutocomplete).toHaveBeenCalledWith('John');
    expect(component.autocompleteUsuarioOptions).toEqual(mockResponse);
  });

  it('should add a new notification to the form array', () => {
    const initialLength = component.notificacoesFA.length;
    const newNotificacao = {
      codigo: 'N001',
      ativo: true,
      tipoFormulario: {
        codigo: '123',
        descricao: 'aahhhh',
        sigla: '123',
      },
      periodicidade: '1H',
      alarmEmail: true,
      alarmPopUp: false,
      status: ['Atrasado'],
      criadoPor: ['Admin'],
    } as Notificacao;

    component.addNotificacaoToFormArray(newNotificacao);

    expect(component.notificacoesFA.length).toBe(initialLength + 1);
    expect(component.notificacoesFA.at(0).get('codigo')?.value).toBe('N001');
  });

  it('should show a warning if form is invalid', () => {
    jest.spyOn(component.perfilForm, 'valid', 'get').mockReturnValue(false);

    component.salvarFormulario();

    expect(toastrs.warning).toHaveBeenCalledWith('Preencha corretamente os campos.');
  });
});
