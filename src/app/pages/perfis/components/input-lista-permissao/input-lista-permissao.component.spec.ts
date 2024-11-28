import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ControlContainer,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { AtivosService } from 'src/app/core/services/ativos/ativos.service';
import { BlocosService } from 'src/app/core/services/blocos/blocos.service';
import { OrgaosService } from 'src/app/core/services/orgaos/orgaos.service';

import { InputChipsListaFormularioComponent } from '../input-chips-lista-formulario/input-chips-lista-formulario.component';
import { InputListaPermissaoComponent } from './input-lista-permissao.component';

describe('InputListaPermissaoComponent', () => {
  let component: InputListaPermissaoComponent;
  let fixture: ComponentFixture<InputListaPermissaoComponent>;
  let toastrService: ToastrService;

  beforeEach(async () => {
    const toastrServiceSpy = { error: jest.fn() };

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
      ],
      declarations: [InputListaPermissaoComponent, InputChipsListaFormularioComponent],
      providers: [
        FormBuilder,
        { provide: ToastrService, useValue: toastrServiceSpy },
        OrgaosService,
        AtivosService,
        BlocosService,
        {
          provide: FormGroupDirective,
          useValue: {
            form: new FormGroup({
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
            }),
          },
        },
        {
          provide: ControlContainer,
          useClass: FormGroupDirective,
        },
        provideAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InputListaPermissaoComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService);

    component.permissoes = new FormGroup({
      orgaos: new FormArray([]),
      blocos: new FormArray([]),
      ativos: new FormArray([]),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add item to form array', () => {
    component.selectedOrgaoAtivoBloco = { value: 'orgao', label: 'Órgão' };
    const item = { codigo: '1', nome: 'Test' };

    component.addItemToFormArray('orgao', item);

    const orgaosFA = component.orgaosFA;
    expect(orgaosFA.length).toBe(1);
    expect(orgaosFA.at(0).value).toEqual({
      codigo: '1',
      nome: 'Test',
      formularios: [],
      tipoPerfil: 'L',
    });
  });
});
