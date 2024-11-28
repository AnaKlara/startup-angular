import { SelectionModel } from '@angular/cdk/collections';
import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PerfilResumoModel } from 'src/app/core/models/perfil.model';
import {
  RequestPaginaDeListaDeSolicitacoesResumoEntity,
  ResponsePaginaDeListaDeSolicitacoesResumidas,
  SolicitacaoResumoEntity,
} from 'src/app/core/services/perfis/entities/solicitacao.entity';
import { PerfisService } from 'src/app/core/services/perfis/perfis.service';
import { LoadingOverlayService } from 'src/app/shared/services/loading-overlay/loading-overlay.service';
import { AlterarNotificacoesComponent } from '../../components/modals/alterar-notificacoes/alterar-notificacoes.component';
import { AlterarPermissoesComponent } from '../../components/modals/alterar-permissoes/alterar-permissoes.component';
import { ConfirmarDesativarComponent } from '../../components/modals/confirmar-desativar/confirmar-desativar.component';

interface ExtendedSolicitacaoResumoModel extends SolicitacaoResumoEntity {
  isChecked: boolean;
}
@Component({
  selector: 'tabela-solicitacoes',
  templateUrl: './tabela-solicitacoes.component.html',
  styleUrl: './tabela-solicitacoes.component.scss',
})
export class TabelaSolicitacoesComponent implements OnInit, AfterContentInit {
  @Input() paginaDeListaDeSolicitacoesResumidas: ResponsePaginaDeListaDeSolicitacoesResumidas;

  selection = new SelectionModel<PerfilResumoModel>(true, []);
  checkAll = false;
  dataSource;
  loading = true;

  columnsToDisplay: string[] = ['checkbox', 'chave', 'usuario', 'lotacao', 'orgaos', 'solicitacoes', 'more'];

  filtrosConsultaListaDeSolicitacoes: RequestPaginaDeListaDeSolicitacoesResumoEntity = {
    paginated: true,
    page: 1,
    pageSize: 10,
    filters: {
      search: '',
      perfilSede: true,
      tipoPerfil: ['ADMINISTRADOR','EMISSOR','EDITOR','LEITOR'],
    },
    orderBy: 'name',
  };

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService,
    private loadingOverlayService: LoadingOverlayService,
    private perfisService: PerfisService,
  ) {
  }

  ngOnInit(): void {
    this.generateDataSourceFromResponseListaUsuarios();
    this.filtrosConsultaListaDeSolicitacoes.filters.search = this.paginaDeListaDeSolicitacoesResumidas.filters.search;
  }

  ngAfterContentInit(): void {
    this.loading = false;
  }

  get isAnyUserSelected(): boolean {
    return this.howManyUsersIsChecked > 0;
  }

  get howManyUsersIsChecked(): number {
    let count = 0;
    this.dataSource.data.forEach((usuario) => {
      if (usuario.isChecked) {
        count += 1;
      }
    });
    return count;
  }

  get isAllChecked(): boolean {
    const numRows = this.dataSource.data.length;
    return this.howManyUsersIsChecked === numRows;
  }

  generateDataSourceFromResponseListaUsuarios(): void {
    const extendedSolicitacaoResumoGrid: ExtendedSolicitacaoResumoModel[] =
      this.paginaDeListaDeSolicitacoesResumidas.listaSolicitacoesResumidas.map(
        (solicitacaoResumida: SolicitacaoResumoEntity) => ({
          ...solicitacaoResumida,
          isChecked: false,
        }),
      );
    this.dataSource = new MatTableDataSource<ExtendedSolicitacaoResumoModel>(extendedSolicitacaoResumoGrid);
  }

  navigateToPerfilPage(chave_usuario: string) {
    const url = this.router.serializeUrl(this.router.createUrlTree([`/perfis/${chave_usuario}`]));
    window.open(url);
  }

  redirectToVisualizar(user) {
    const url = this.router.serializeUrl(this.router.createUrlTree([`/perfis/${user.chave}/visualizar`]));
    window.open(url);
  }

  handlePageEvent($event) {
    this.filtrosConsultaListaDeSolicitacoes.page = $event.pageIndex + 1;
    this.getListaDePerfis(this.filtrosConsultaListaDeSolicitacoes);
  }

  getListaDePerfis(filtro) {
    this.loadingOverlayService.setLoading(true);
    this.loading = true;
    this.perfisService.getPaginaDeListaDeSolicitacoesResumidas(filtro).subscribe({
      complete: () => {
        this.loadingOverlayService.setLoading(false);
        this.generateDataSourceFromResponseListaUsuarios();
        this.loading = false;
      },
      next: (response) => {
        this.paginaDeListaDeSolicitacoesResumidas = response;
      },
      error: (response) => {
        this.toastr.error('Não foi possível buscar os dados.');
        this.loadingOverlayService.setLoading(false);
      },
    });
  }

  trackByOrgao(orgao): string | number {
    return orgao.codigo;
  }

  trackBySolicitacao(solicitacao): string | number {
    return solicitacao;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  toggleCheckBox(usuario) {
    usuario.isChecked = !usuario.isChecked;
    if (this.isAllChecked) {
      this.checkAll = true;
    } else {
      this.checkAll = false;
    }
  }

  toggleCheckAllRows(checkAll: boolean) {
    this.dataSource.data.forEach((usuario) => (usuario.isChecked = checkAll));
    this.dataSource.data = [...this.dataSource.data];
    this.checkAll = !this.checkAll;
  }

  unCheckAllRows() {
    this.dataSource.data.forEach((usuario) => (usuario.isChecked = false));
    this.dataSource.data = [...this.dataSource.data];
    this.checkAll = false;
  }

  openModalEditarPermissoes() {
    const dialogRef = this.dialog.open(AlterarPermissoesComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openModalEditarNotificacoes() {
    const dialogRef = this.dialog.open(AlterarNotificacoesComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openModalEditarConfirmarDesativar() {
    const dialogRef = this.dialog.open(ConfirmarDesativarComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  sortData(sort: Sort) {
    const data = this.dataSource.listaUsuarios.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.listaUsuarios = data;
      return;
    }

    this.dataSource.listaUsuarios = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'nome':
          return this.compare(a.nome, b.nome, isAsc);
        case 'chave':
          return this.compare(a.chave, b.chave, isAsc);
        default:
          return 0;
      }
    });
  }

  private compare<T extends number | string>(a: T, b: T, isAsc: boolean): number {
    if (typeof a !== 'number' && typeof a !== 'string') {
      throw new Error('a must be a number or string');
    }
    if (typeof b !== 'number' && typeof b !== 'string') {
      throw new Error('b must be a number or string');
    }
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
