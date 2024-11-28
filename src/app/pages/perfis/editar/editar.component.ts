import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { LogModel } from 'src/app/core/models/perfil-log.model';
import { Notificacao, PerfilEntity, TipoPerfil } from 'src/app/core/services/perfis/entities/perfil.entity';
import { PerfisService } from 'src/app/core/services/perfis/perfis.service';
import { LoadingOverlayService } from 'src/app/shared/services/loading-overlay/loading-overlay.service';
import { ConfirmarDesativarComponent } from '../components/modals/confirmar-desativar/confirmar-desativar.component';
import { DescartarAlteracaoComponent } from '../components/modals/descartar-alteracao/descartar-alteracao.component';
import { JustificarAlteracaoComponent } from '../components/modals/justificar-alteracao/justificar-alteracao.component';
import { SolicitarAlteracaoComponent } from '../components/modals/solicitar-alteracao/solicitar-alteracao.component';

type PermissaoTipo = 'orgao' | 'bloco' | 'ativo';

@Component({
  selector: 'editar',
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.scss',
})
export class EditarComponent implements OnInit {

  breadcrumbItems = [
    { label: 'Início', url: '/home' },
    { label: 'Perfis', url: '/perfis' },
  ];
  usuarioTemPermissao = false; // TODO: adicionar lógica de verificação da permissão do usuário logado para mudar o fluxo de salvar/editar e exibir ou não elementos na tela

  triggerEventToFloatContainer: Subject<void> = new Subject<void>();
  perfilUsuario: PerfilEntity;
  listaDelogsUsuario: LogModel[];
  isMatMenuOpen: boolean = false;

  perfilForm = new FormGroup({
    chave: new FormControl(''),
    ativo: new FormControl(true),
    tipoPerfil: new FormControl('', Validators.required),
    perfilSede: new FormControl(false),
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
    private route: ActivatedRoute,
    private toastrs: ToastrService,
    private perfisService: PerfisService,
    private FB: FormBuilder, 
    private router: Router,
    private loadingOverlay: LoadingOverlayService,
    public dialog: MatDialog,
  ) {
    this.route.data.subscribe((data) => {
      this.perfilUsuario = data['usuario'] as PerfilEntity;
      this.breadcrumbItems.push({ label: data['usuario'].chave as string, url: '' });
    });
  }

  ngOnInit(): void {
    this.patchValuesToForm();
    this.openModalJustificarAlteracao(); // TODO: remover; esta linha serve para propósitos de teste apenas
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

  redirectToClonar() {
    this.router.navigateByUrl(`/perfis/${this.perfilUsuario.chave}/clonar`);
  }

  visualizarLog() {
    this.buscarLogsDoUsuario();
  }

  buscarLogsDoUsuario() {
    this.loadingOverlay.setLoading(true);
    this.perfisService
      .getLogsPerfil(this.perfilUsuario.chave)
      .pipe()
      .subscribe({
        complete: () => {
          this.loadingOverlay.setLoading(false);
        },
        next: (response) => {
          (this.listaDelogsUsuario = response), this.abrirDivLateral();
        },
        error: (response) => {
          this.toastrs.error('Não foi possível buscar os logs.');
        },
      });
  }

  abrirDivLateral() {
    this.triggerEventToFloatContainer.next();
  }

  openModalDesativarPerfil() {
    const dialogRef = this.dialog.open(ConfirmarDesativarComponent, {
      width: '35rem',
      minHeight: '19rem',
    });
    dialogRef.componentInstance.confirmarDesativarEE.subscribe(() => {

      this.perfisService.desativarPerfil(this.perfilUsuario.chave).subscribe({
        next: () => {
          this.toastrs.success('Usuário desativado corretamente.');
        },
        error: () => {
          this.toastrs.success('Não foi possível desativar usuário.');
        },
        complete: () => {},
      });
    });
  }

  trackByIndexN(index: number, item: any): any {
    return index;
  }

  patchValuesToForm() {
    this.perfilForm.get('chave')?.setValue(this.perfilUsuario.chave);
    this.perfilForm.get('ativo')?.setValue(this.perfilUsuario.ativo);
    this.perfilForm.get('tipoPerfil')?.setValue(this.perfilUsuario.tipoPerfil);
    this.perfilForm.get('perfilSede')?.setValue(this.perfilUsuario.perfilSede);
    if(this.perfilUsuario.permissoes.orgaos){
      for(let orgao of this.perfilUsuario.permissoes.orgaos){
        this.addItemToFormArray('orgao', orgao)
      }
    }
    if(this.perfilUsuario.permissoes.blocos){
      for(let bloco of this.perfilUsuario.permissoes.blocos){
        this.addItemToFormArray('bloco', bloco)
      }
    }
    if(this.perfilUsuario.permissoes.ativos){
      for(let ativo of this.perfilUsuario.permissoes.ativos){
        this.addItemToFormArray('ativo', ativo)
      }
    }

    if(this.perfilUsuario.notificacoes){
      for(let notificacao of this.perfilUsuario.notificacoes){
        this.addNotificacaoToFormArray(notificacao);
      }
    }

  }
  
  addNotificacaoToFormArray(notificacao: Notificacao){
    const notificacaoForm = new FormGroup({
      codigo: new FormControl(notificacao.codigo),
      ativo: new FormControl(notificacao.ativo),
      tipoFormulario: new FormControl(notificacao.tipoFormulario, Validators.required),
      periodicidade: new FormControl(notificacao.periodicidade, Validators.required),
      alarmEmail: new FormControl(notificacao.alarmEmail),
      alarmPopUp: new FormControl(notificacao.alarmPopUp),
      status: new FormControl(notificacao.status),
      criadoPor:  new FormControl(notificacao.criadoPor)
    });
    this.notificacoesFA.push(notificacaoForm);
  }

  addItemToFormArray(itemType: PermissaoTipo, item: { codigo: string; nome: string, formularios: any[]; tipoPerfil: string }) {
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

  salvarAleracoes(){
    const formularioEstaCorreto = this.perfilForm.valid;
    const formFoiAlterado = !this.perfilForm.pristine;
    if(formFoiAlterado){
      if (formularioEstaCorreto) {
        console.log(this.perfilForm.value);
      } else {
        this.toastrs.warning('Preencha corretamente os campos.');
        this.perfilForm.markAllAsTouched();
      }
    } else {
      this.toastrs.warning('Nenhum dado foi alterado.');
    }
  }

  solicitarAlteracao(){
    //console.log(this.perfilForm.value)
    const formularioEstaCorreto = this.perfilForm.valid;
    if (formularioEstaCorreto) {
      console.log(this.perfilForm.value);
      this.openModalSolicitarAlteracao();
    } else {
      this.toastrs.warning('Preencha corretamente os campos.');
      this.perfilForm.markAllAsTouched();
    }
  }

  openModalSolicitarAlteracao() {
    const dialogRef = this.dialog.open(SolicitarAlteracaoComponent, {
      minWidth: '44vw',
      minHeight: '90vh',
      maxHeight: '90vh',
    });

    dialogRef.componentInstance.confirmarEE.subscribe(() => {
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openModalJustificarAlteracao() {
    const dialogRef = this.dialog.open(JustificarAlteracaoComponent, {
      minWidth: '44vw',
      minHeight: '90vh',
      maxHeight: '90vh',
    });

    dialogRef.componentInstance.confirmarEE.subscribe(() => {
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  cancelarEdicao() {
    const formNFoiAlterado = this.perfilForm.pristine;
    if(formNFoiAlterado){
      this.router.navigate(['/perfis']);
    } else {
      this.openModalDescartarAlteracoes();
    }
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
