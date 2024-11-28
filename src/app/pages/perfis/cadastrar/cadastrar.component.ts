import { AfterViewInit, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime, filter } from 'rxjs';
import { Notificacao, TipoPerfil } from 'src/app/core/services/perfis/entities/perfil.entity';
import { UsuarioResumo } from 'src/app/core/services/usuarios/usuario.entity';
import { UsuariosService } from 'src/app/core/services/usuarios/usuarios.service';

import { DescartarAlteracaoComponent } from '../components/modals/descartar-alteracao/descartar-alteracao.component';

type PermissaoTipo = 'orgao' | 'bloco' | 'ativo';

@Component({
  selector: 'cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.scss',
})
export class CadastrarComponent implements AfterViewInit {
  breadcrumbItems = [
    { label: 'Início', url: '/home' },
    { label: 'Perfis', url: '/perfis' },
    { label: 'Cadastro', url: '' },
  ];

  autocompleteUsuarioloading = false;
  autocompleteUsuarioOptions;
  usuarioResumo: UsuarioResumo;
  inputAutocomplete: string = '';
  private searchSubject = new Subject<string>();

  perfilForm = new FormGroup({
    chave: new FormControl(),
    ativo: new FormControl(true),
    tipoPerfil: new FormControl('L'),
    perfilSede: new FormControl(true),
    permissoes: new FormGroup({
      orgaos: new FormArray([]),
      blocos: new FormArray([]),
      ativos: new FormArray([]),
    }),
    notificacoes: new FormArray([]),
  });

  tiposPerfis = [
    { label: 'Administrador', value: TipoPerfil.Administrador },
    { label: 'Editor', value: TipoPerfil.Editor },
    { label: 'Leitor', value: TipoPerfil.Leitor },
  ];

  constructor(
    private toastrs: ToastrService,
    private usuariosService: UsuariosService,
    private FB: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  ngAfterViewInit(): void {
    this.searchSubject
      .pipe(
        debounceTime(300), // Adiciona um debounce de 300ms
        filter(text => text.length >= 3), // Filtra para disparar a pesquisa apenas com 3 ou mais caracteres
      )
      .subscribe(searchTerm => {
        this.search(searchTerm);
      });
  }

  get chavePerfil(): string {
    return this.perfilForm.get('chave')?.value as string;
  }

  get orgaosFA(): FormArray {
    return this.perfilForm.get('permissoes.orgaos') as FormArray;
  }
  get blocosFA(): FormArray {
    return this.perfilForm.get('permissoes.blocos') as FormArray;
  }
  get ativosFA(): FormArray {
    return this.perfilForm.get('permissoes.ativos') as FormArray;
  }
  get notificacoesFA(): FormArray {
    return this.perfilForm.get('notificacoes') as FormArray;
  }

  onSearch(value: string): void {
    this.searchSubject.next(value);
  }

  search(term: string): void {
    //console.log('Pesquisa realizada com:', term);
    this.autocompleteUsuarioloading = true;
    this.usuariosService.gelListaUsuariosAutocomplete(term).subscribe({
      next: response => {
        //console.log(response);
        this.autocompleteUsuarioOptions = response;
      },
      complete: () => {
        this.autocompleteUsuarioloading = false;
      },
      error: () => {
        this.toastrs.error('Não foi possível buscar lista de usuários');
      },
    });
  }

  autocompleteSelectionChange($event: MatAutocompleteSelectedEvent) {
    //console.log($event.option.value);
    this.usuarioResumo = $event.option.value as UsuarioResumo;
    this.perfilForm.get('chave')?.setValue($event.option.value.chave as string);
  }

  displayFn(option: { chave: string; nome: string; lotacao: string }): string {
    return option ? `${option.chave} - ${option.nome}` : '';
  }

  addNotificacaoToFormArray(notificacao: Notificacao) {
    const notificacaoForm = new FormGroup({
      codigo: new FormControl(notificacao.codigo),
      ativo: new FormControl(notificacao.ativo),
      tipoFormulario: new FormControl(notificacao.tipoFormulario, Validators.required),
      periodicidade: new FormControl(notificacao.periodicidade, Validators.required),
      alarmEmail: new FormControl(notificacao.alarmEmail),
      alarmPopUp: new FormControl(notificacao.alarmPopUp),
      status: new FormControl(notificacao.status),
      criadoPor: new FormControl(notificacao.criadoPor),
    });
    this.notificacoesFA.push(notificacaoForm);
  }

  addItemToFormArray(
    itemType: PermissaoTipo,
    item: { codigo: string; nome: string; formularios: any[]; tipoPerfil: string },
  ) {
    const fieldGroup = this.FB.group({
      codigo: new FormControl(item.codigo),
      nome: new FormControl(item.nome),
      formularios: new FormControl(item.formularios, Validators.required),
      tipoPerfil: new FormControl(item.tipoPerfil),
    });
    switch (
      itemType //'orgao' | 'bloco' | 'ativo';
    ) {
      case 'orgao':
        this.orgaosFA.push(fieldGroup);
        break;
      case 'bloco':
        this.blocosFA.push(fieldGroup);
        break;
      case 'ativo':
        this.ativosFA.push(fieldGroup);
        break;
    }
  }

  notificacaoFG(index): FormGroup {
    return this.notificacoesFA.controls.at(index) as FormGroup;
  }

  salvarFormulario() {
    const formularioEstaCorreto = this.perfilForm.valid;
    if (formularioEstaCorreto) {
      console.log(this.perfilForm.value);
      // TODO: chamar serviço para salvar usuario
    } else {
      this.toastrs.warning('Preencha corretamente os campos.');
    }
  }

  cancelarCadastro() {
    this.openModalDescartarAlteracoes();
  }

  openModalDescartarAlteracoes() {
    const dialogRef = this.dialog.open(DescartarAlteracaoComponent, {
      width: '35rem',
      minHeight: '19rem',
    });
    dialogRef.componentInstance.confirmarDescartarEE.subscribe(() => {
      this.router.navigate(['/perfis']);
    });
  }
}
