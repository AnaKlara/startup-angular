import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { PerfisService } from 'src/app/core/services/perfis/perfis.service';

import { InputTipoFormularioComponent } from '../input-tipo-formulario/input-tipo-formulario.component';
import { SelectCriadoPorComponent } from '../select-criado-por/select-criado-por.component';
import { InputListaNotificacaoComponent } from './input-lista-notificacao.component';

describe('InputListaNotificacaoComponent', () => {
  let component: InputListaNotificacaoComponent;
  let fixture: ComponentFixture<InputListaNotificacaoComponent>;
  let mockPerfisService: Partial<PerfisService>;
  let mockToastService: Partial<ToastrService>;

  beforeEach(async () => {
    mockPerfisService = {};
    mockToastService = {};

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatSelectModule,
      ],
      declarations: [InputListaNotificacaoComponent, SelectCriadoPorComponent, InputTipoFormularioComponent],
      providers: [
        FormBuilder,
        { provide: PerfisService, useValue: mockPerfisService },
        { provide: ToastrService, useValue: mockToastService },
        provideAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InputListaNotificacaoComponent);
    component = fixture.componentInstance;

    component.perfilForm = new FormGroup({
      chave: new FormControl(''),
      ativo: new FormControl(true),
      tipoPerfil: new FormControl(''),
      perfilSede: new FormControl(false),
      permissoes: new FormGroup({
        orgaos: new FormArray([]),
        blocos: new FormArray([]),
        ativos: new FormArray([]),
      }),
      notificacoes: new FormArray([]),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new notificacao form group to the form array', () => {
    component.perfilForm = new FormGroup({
      notificacoes: new FormArray([]),
    });

    component.addNotificacaoToFormArray();

    const notificacoesFA = component.notificacoesFA;

    expect(notificacoesFA.length).toBe(1);

    const addedFormGroup = notificacoesFA.at(0) as FormGroup;
    expect(addedFormGroup.get('codigo')?.value).toBe('');
    expect(addedFormGroup.get('ativo')?.value).toBe(true);
    expect(addedFormGroup.get('tipoFormulario')?.value).toBe(null);
    expect(addedFormGroup.get('periodicidade')?.value).toBe('');
    expect(addedFormGroup.get('alarmEmail')?.value).toBe(false);
    expect(addedFormGroup.get('alarmPopUp')?.value).toBe(false);
    expect(addedFormGroup.get('status')?.value).toEqual([]);
    expect(addedFormGroup.get('criadoPor')?.value).toEqual([]);
  });
});
