import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import {
  FormularioResumoModel,
  RequestListaFormularioResumoModel,
  ResponsePageOfListaFormularioResumoModel,
} from 'src/app/core/models/formulario-resumo.model';
import { FormulariosService } from 'src/app/core/services/formulario/formularios.service';
import { ConfirmarDownloadComponent } from '../modals/confirmar-download/confirmar-download.component';

interface TabelaFormularioResumoModel extends FormularioResumoModel {
  isChecked: boolean;
}

@Component({
  selector: 'tabela-formularios',
  templateUrl: './tabela-formularios.component.html',
  styleUrl: './tabela-formularios.component.scss',
})
export class TabelaFormulariosComponent {
  isFiltroResultadosOpen = false; // false

  @Input({ required: true }) PageOfListaFormularioResumo: ResponsePageOfListaFormularioResumoModel;

  @Input({ required: true }) FiltroListaFormularioResumo: RequestListaFormularioResumoModel;

  pageOfListaFormularioResumo: ResponsePageOfListaFormularioResumoModel;
  filtrosRequestFormularioResumo: RequestListaFormularioResumoModel;
  dataSource;

  selection = new SelectionModel<FormularioResumoModel>(true, []);
  checkAll = false;
  loading = true;
  searchTableFC = new FormControl('');

  displayedColumns: string[] = [
    'checkbox',
    'tipoDoFormulario',
    'nomeDoArquivo',
    'editorChave',
    'orgao',
    'dataCriacao',
    'dataEnvio',
    'situacaoArquivo',
    'nomePoco',
    'responsavel',
    'more',
  ];

  get isAllChecked(): boolean {
    const numRows = this.dataSource.data.length;
    return this.howManyFormulariosIsChecked === numRows;
  }
  get isAnyFormulatioChecked(): boolean {
    return this.howManyFormulariosIsChecked > 0;
  }

  get howManyFormulariosIsChecked(): number {
    let count = 0;
    this.dataSource.data.forEach((formulario) => {
      if (formulario.isChecked) {
        count += 1;
      }
    });
    return count;
  }

  constructor(
    public dialog: MatDialog,
    private formulariosService: FormulariosService,
    private toastService: ToastrService,
    private elementRef: ElementRef,
  ) {}

  ngOnInit(): void {
    this.generateDataSourceFromListaFormularios(this.PageOfListaFormularioResumo.listaFormularios);
    this.filtrosRequestFormularioResumo = this.FiltroListaFormularioResumo;
    this.pageOfListaFormularioResumo = this.PageOfListaFormularioResumo;
  }

  ngAfterContentInit(): void {
    this.loading = false;
  }

  generateDataSourceFromListaFormularios(listaFormulariosResumo: FormularioResumoModel[]): void {
    const listExtendedFormularioResumoModel: TabelaFormularioResumoModel[] = listaFormulariosResumo.map(
      (formulario: FormularioResumoModel) => ({
        ...formulario,
        isChecked: false,
      }),
    );
    this.dataSource = new MatTableDataSource<TabelaFormularioResumoModel>(listExtendedFormularioResumoModel);
    //console.log(this.dataSource.data);
  }

  toggleCheckBox(formulario) {
    formulario.isChecked = !formulario.isChecked;
    if (this.isAllChecked) {
      this.checkAll = true;
    } else {
      this.checkAll = false;
    }
  }

  toggleCheckAllRows(checkAll: boolean) {
    this.dataSource.data.forEach((formulario) => (formulario.isChecked = checkAll));
    this.dataSource.data = [...this.dataSource.data];
    this.checkAll = !this.checkAll;
  }

  openConfirmarDownloadModal() {
    const dialogRef = this.dialog.open(ConfirmarDownloadComponent, {
      width: '35rem',
      height: '12.25rem',
    });
    dialogRef.componentInstance.confirmarDownloadEE.subscribe(() => {
      // lógica de download aqui
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'situacaoArquivo':
          console.log('chamou');
          return this.compare(a.situacaoArquivo, b.situacaoArquivo, isAsc);
        case 'tipoDoFormulario':
          return this.compare(a.tipoDoFormulario, b.tipoDoFormulario, isAsc);
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

  paginatorChange($event: PageEvent) {
    this.filtrosRequestFormularioResumo.page = $event.pageIndex;
    this.buscarListaFormularios(this.filtrosRequestFormularioResumo);
  }

  buscarListaFormularios(filtro: RequestListaFormularioResumoModel) {
    this.formulariosService.getListaFormulariosResumo(filtro).subscribe({
      next: (response) => {
        this.pageOfListaFormularioResumo = response;
        this.generateDataSourceFromListaFormularios(response.listaFormularios);
      },
      complete: () => {},
      error: () => {
        this.toastService.error('Não foi possível buscar formulários');
      },
    });
  }

  openFiltroResultados() {
    this.isFiltroResultadosOpen = true;
  }

  closeFiltroResultados() {
    this.isFiltroResultadosOpen = false;
  }

  // @HostListener('document:mousedown', ['$event'])
  // onClick(event: MouseEvent) {
  //   const filtroDeResultadosElement = this.elementRef.nativeElement.querySelector('#filtroDeResultados');
  //   if (this.isFiltroResultadosOpen===true && !!filtroDeResultadosElement && !filtroDeResultadosElement.contains(event.target)) {
  //     this.isFiltroResultadosOpen = false;
  //   }
  // }
}
