import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { NoopAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { perfilSelectMock } from 'src/app/core/services/perfis/mocks/perfil-select.mock';
import { perfilMock } from 'src/app/core/services/perfis/mocks/perfil.mock';
import { PerfisService } from 'src/app/core/services/perfis/perfis.service';
import { LoadingOverlayService } from 'src/app/shared/services/loading-overlay/loading-overlay.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { CardsLogContainerComponent } from '../components/cards-log-container/cards-log-container.component';
import { FloatContainerComponent } from '../components/float-container/float-container.component';
import { InputChipsListaFormularioComponent } from '../components/input-chips-lista-formulario/input-chips-lista-formulario.component';
import { InputListaNotificacaoComponent } from '../components/input-lista-notificacao/input-lista-notificacao.component';
import { InputListaPermissaoComponent } from '../components/input-lista-permissao/input-lista-permissao.component';
import { InputTipoFormularioComponent } from '../components/input-tipo-formulario/input-tipo-formulario.component';
import { ConfirmarDesativarComponent } from '../components/modals/confirmar-desativar/confirmar-desativar.component';
import { DescartarAlteracaoComponent } from '../components/modals/descartar-alteracao/descartar-alteracao.component';
import { JustificarAlteracaoComponent } from '../components/modals/justificar-alteracao/justificar-alteracao.component';
import { SolicitarAlteracaoComponent } from '../components/modals/solicitar-alteracao/solicitar-alteracao.component';
import { SelectCriadoPorComponent } from '../components/select-criado-por/select-criado-por.component';
import { EditarComponent } from './editar.component';

describe('EditarComponent', () => {
  let component: EditarComponent;
  let fixture: ComponentFixture<EditarComponent>;
  let mockDialogRef: jest.Mocked<MatDialogRef<any>>;
  let mockDialog: jest.Mocked<MatDialog>;

  beforeEach(async () => {
    // Mocking the `MatDialogRef`
    mockDialogRef = {
      close: jest.fn(),
      afterClosed: jest.fn().mockReturnValue(of(true)),
      componentInstance: {
        confirmarEE: of(null), // Mocking the observable `confirmarEE`
      },
    } as unknown as jest.Mocked<MatDialogRef<unknown>>;

    // Mocking the `MatDialog`
    mockDialog = {
      open: jest.fn().mockReturnValue(mockDialogRef),
    } as unknown as jest.Mocked<MatDialog>;

    await TestBed.configureTestingModule({
      declarations: [
        EditarComponent,
        FloatContainerComponent,
        CardsLogContainerComponent,
        InputListaPermissaoComponent,
        InputListaNotificacaoComponent,
        ConfirmarDesativarComponent,
        DescartarAlteracaoComponent,
        JustificarAlteracaoComponent,
        SolicitarAlteracaoComponent,
        InputTipoFormularioComponent,
        SelectCriadoPorComponent,
        InputChipsListaFormularioComponent,
      ],
      imports: [
        NoopAnimationsModule,
        SharedModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        MatSelectModule,
        MatIconModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatDialogModule,
        MatMenuModule,
        MatChipsModule,
        MatSlideToggleModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: PerfisService,
          useValue: { getLogsPerfil: () => of([]), getPerfilByFormulario: () => of(perfilSelectMock) },
        },
        { provide: LoadingOverlayService, useValue: { setLoading: () => {} } },
        { provide: MatDialog, useValue: mockDialog }, // Providing mocked `MatDialog`
        { provide: MatDialogRef, useValue: mockDialogRef }, // Providing mocked `MatDialogRef`
        provideAnimations(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarComponent);
    component = fixture.componentInstance;
    component.perfilUsuario = perfilMock;
    component.patchValuesToForm();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
