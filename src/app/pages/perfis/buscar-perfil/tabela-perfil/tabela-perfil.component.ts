import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  RequestPaginaDeListaDePerfisResumoEntity,
  ResponsePaginaDeListaDePerfisResumoEntity,
} from 'src/app/core/services/perfis/entities/perfil-resumo.entity';

import { PerfilResumoModel } from 'src/app/core/models/perfil.model';
import { PerfisService } from 'src/app/core/services/perfis/perfis.service';
import { LoadingOverlayService } from 'src/app/shared/services/loading-overlay/loading-overlay.service';
import { AlterarNotificacoesComponent } from '../../components/modals/alterar-notificacoes/alterar-notificacoes.component';
import { AlterarPermissoesComponent } from '../../components/modals/alterar-permissoes/alterar-permissoes.component';
import { ConfirmarDesativarComponent } from '../../components/modals/confirmar-desativar/confirmar-desativar.component';

interface ExtendedPerfilResumoModel extends PerfilResumoModel {
  isChecked: boolean;
}

@Component({
  selector: 'tabela-perfil',
  templateUrl: './tabela-perfil.component.html',
  styleUrls: ['./tabela-perfil.component.scss'],
})
export class TabelaPerfilComponent implements OnInit {
  @Input({ required: true }) paginaDeListaDePerfisResumidos: ResponsePaginaDeListaDePerfisResumoEntity;

  selection = new SelectionModel<PerfilResumoModel>(true, []);
  checkAll = false;
  dataSource;
  loading = true;

  columnsToDisplay: string[] = [
    'checkbox',
    'chave',
    'usuario',
    'lotacao',
    'orgaos',
    'formularios',
    'tiposPerfis',
    'more',
  ];

  filtrosConsultaListaDePerfis: RequestPaginaDeListaDePerfisResumoEntity = {
    paginated: true,
    page: 1,
    pageSize: 10,
    filters : {
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
  ) {  }

  ngOnInit(): void {
    this.generateDataSourceFromResponseListaUsuarios();
    this.filtrosConsultaListaDePerfis.filters.search = this.paginaDeListaDePerfisResumidos.filters.search;
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
    const extendedPerfilResumoGridModel: ExtendedPerfilResumoModel[] =
      this.paginaDeListaDePerfisResumidos.listaPerfisResumidos.map((perfilResumido: PerfilResumoModel) => ({
        ...perfilResumido,
        isChecked: false,
      }));
    this.dataSource = new MatTableDataSource<ExtendedPerfilResumoModel>(extendedPerfilResumoGridModel);
  }

  navigateToPerfilPage(chave_usuario: string) {
    const url = this.router.serializeUrl(this.router.createUrlTree([`/perfis/${chave_usuario}`]));
    window.open(url);
  }

  redirectToVisualizar(user) {
    const url = this.router.serializeUrl(this.router.createUrlTree([`/perfis/${user.chave}/visualizar`]));
    window.open(url);
  }

  redirectToClonar(user) {
    const url = this.router.serializeUrl(this.router.createUrlTree([`/perfis/${user.chave}/clonar`]));
    window.open(url);
  }

  redirectToEditar(user) {
    const url = this.router.serializeUrl(this.router.createUrlTree([`/perfis/${user.chave}/editar`]));
    window.open(url);
  }

  handlePageEvent($event) {
    this.filtrosConsultaListaDePerfis.page = $event.pageIndex + 1;
    this.getListaDePerfis(this.filtrosConsultaListaDePerfis);
  }

  getListaDePerfis(filtro) {
    this.loadingOverlayService.setLoading(true);
    this.loading = true;
    this.perfisService.getPaginaDeListaDePerfisResumidos(filtro).subscribe({
      complete: () => {
        this.loadingOverlayService.setLoading(false);
        this.generateDataSourceFromResponseListaUsuarios();
        this.loading = false;
      },
      next: (response) => {
        this.paginaDeListaDePerfisResumidos = response;
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
  trackByFormulario(formulario): string | number {
    return formulario.codigo;
  }
  trackByTiposPerfis(tipoPerfil): string | number {
    return tipoPerfil.codigo;
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

  openModalEditarNotificacoes() {
    const dialogRef = this.dialog.open(AlterarNotificacoesComponent, {
      minWidth: '90vw',
      minHeight: '90vh',
      maxHeight: '90vh',
    });

    dialogRef.componentInstance.confirmarEE.subscribe(() => {
      //console.log('Editou notificações');
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  openModalEditarPermissoes() {
    const dialogRef = this.dialog.open(AlterarPermissoesComponent, {
      minWidth: '90vw',
      minHeight: '90vh',
      maxHeight: '90vh',
    });

    dialogRef.componentInstance.confirmarEE.subscribe(() => {
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }


  openModalEditarConfirmarDesativar() {
    const dialogRef = this.dialog.open(ConfirmarDesativarComponent);

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
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
