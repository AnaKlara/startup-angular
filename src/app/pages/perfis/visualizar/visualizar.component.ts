import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { LogModel } from 'src/app/core/models/perfil-log.model';
import { PerfilEntity } from 'src/app/core/services/perfis/entities/perfil.entity';
import { PerfisService } from 'src/app/core/services/perfis/perfis.service';
import { LoadingOverlayService } from 'src/app/shared/services/loading-overlay/loading-overlay.service';
import { ConfirmarDesativarComponent } from '../components/modals/confirmar-desativar/confirmar-desativar.component';

@Component({
  selector: 'visualizar',
  templateUrl: './visualizar.component.html',
  styleUrl: './visualizar.component.scss',
})
export class VisualizarComponent implements OnInit {
  breadcrumbItems = [
    { label: 'Início', url: '/home' },
    { label: 'Perfis', url: '/perfis' },
  ];

  triggerEventToFloatContainer: Subject<void> = new Subject<void>();

  perfilUsuario: PerfilEntity;

  isMatMenuOpen: boolean = false;

  listaDelogsUsuario: LogModel[];

  constructor(
    private route: ActivatedRoute,
    private toastrs: ToastrService,
    private perfisService: PerfisService,
    private router: Router,
    private loadingOverlay: LoadingOverlayService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.route?.data?.subscribe((data) => {
      this.perfilUsuario = data['usuario'] as PerfilEntity;
      this.breadcrumbItems.push({ label: data['usuario'].chave as string, url: '' });
    });
  }

  onToggleChange(codigo_notificacao: string, event: MatSlideToggleChange): void {
    this.perfisService.updateNotificacaoAtivo(codigo_notificacao, event.checked).subscribe({
      next: (response) => {
        this.toastrs.success('Notificação atualizada.');
      },
      error: (error) => {
        this.toastrs.error('Não foi possível alterar notificação.');
      },
    });
  }
  redirectToEditar() {
    this.router.navigateByUrl(`/perfis/${this.perfilUsuario.chave}/editar`);
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
      console.log('Excluiu usuario');

      this.perfisService.desativarPerfil(this.perfilUsuario.chave).subscribe({
        next: () => {
          this.toastrs.success('Usuário desativado corretamente.');
          //this.buscarDadosDoUsuario(this.usuario.chave);
        },
        error: () => {
          this.toastrs.success('Não foi possível desativar usuário.');
        },
        complete: () => {},
      });
    });
  }
}
