import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, filter, finalize } from 'rxjs';
import {
  ResponsePaginaDeListaDePerfisResumoEntity
} from 'src/app/core/services/perfis/entities/perfil-resumo.entity';
import { PerfilSelect } from 'src/app/core/services/perfis/entities/perfil-select';
import { PerfisService } from 'src/app/core/services/perfis/perfis.service';
import { LoadingOverlayService } from 'src/app/shared/services/loading-overlay/loading-overlay.service';

type tipoPerfil = 'TODOS' | 'ADMINISTRADOR' | 'EMISSOR'| 'EDITOR' | 'LEITOR';

@Component({
  selector: 'buscar-perfil',
  templateUrl: './buscar-perfil.component.html',
  styleUrl: './buscar-perfil.component.scss',
})
export class BuscarPerfilComponent implements OnInit {

  breadcrumbItems = [
    { label: 'Início', url: '/home' },
    { label: 'Perfis', url: '' },
  ];

  perfilAutocompleteOptions: PerfilSelect[];
  loadingAutocomplete = false;

  lotacaoOptions = [
    {
      label: 'GPP-E&P',
      value: '123',
    },
    {
      label: 'EAEP',
      value: '456',
    },
    {
      label: 'ICSP',
      value: '789',
    },
    {
      label: 'Marinha',
      value: '135',
    },
  ];

  orgaoOptions = [
    {
      label: 'ABGF',
      value: '123',
    },
    {
      label: 'orgao 2',
      value: '234',
    },
    {
      label: 'orgao 3',
      value: '456',
    },
    {
      label: 'orgao 4',
      value: '567',
    },
  ];

  formulariosOprtions = [
    {
      label: 'RFAP',
      value: '123',
    },
    {
      label: 'NCSB',
      value: '345',
    },
    {
      label: 'RCP',
      value: '567',
    },
    {
      label: 'ABF',
      value: '789',
    },
  ];

  todosTiposDePerfis = true;
  perfilAdm = false;
  perfilEmi = false;
  perfilEdt = false;
  perfilLeitor = false;

  resultadoConsulta: ResponsePaginaDeListaDePerfisResumoEntity;
  filtrosConsultaListaDePerfis: FormGroup = new FormGroup({
    paginated: new FormControl(true),
    page: new FormControl(0),
    pageSize: new FormControl(10),
    orderBy: new FormControl('name'),
    filters : new FormGroup({
      search: new FormControl(''),
      perfilSede:  new FormControl(true),
      tipoPerfil: new FormControl(['ADMINISTRADOR','EMISSOR','EDITOR','LEITOR']),
      lotacao: new FormControl(null),
      orgao: new FormControl(null),
      formulario: new FormControl(null),
    })
    });
  
  toggleShowTable = false;
  paginaListaDeSolicitacoes;

  constructor(
    private perfisService: PerfisService,
    private loadingOverlayService: LoadingOverlayService,
    private toastService: ToastrService,
    public  router: Router,
    private fb: FormBuilder 
  ) {
    this.toastService.error('','Erro ao buscar dados.'); // TODO: remover; esta linha serve para propósitos de teste apenas
    this.toastService.success('','Formulário salvo sucesso!');// TODO: remover; esta linha serve para propósitos de teste apenas
    this.toastService.warning('Preencha todos os campos');// TODO: remover; esta linha serve para propósitos de teste apenas
    this.toastService.info('É necessário ter permissão de Administrador para ver esta página','Dica:');// TODO: remover; esta linha serve para propósitos de teste apenas
  }

  ngOnInit(): void {
    this.getListaDePerfis();

    this.filtrosConsultaListaDePerfis.get('filters.search')?.valueChanges
    .pipe(
      debounceTime(300), // 300ms
      filter((changedValue) => changedValue?.length >= 3), // pesquisa apenas no mínimo 3 ou mais caracteres
    )
    .subscribe((searchTerm) => {
      this.search(searchTerm);
    });
  }

  get tipoPerfilControl(): FormControl {
    return this.filtrosConsultaListaDePerfis.get('filters.tipoPerfil') as FormControl;
  }

  search(term: string | null | undefined): void {
    //console.log('Pesquisa realizada com:', term);
    this.loadingAutocomplete = true;
    if (term) {
      this.perfisService.getPerfilSelect(term).subscribe(
        (next) => {
          this.loadingAutocomplete = false;
          this.perfilAutocompleteOptions = next;
        },
        (error) => {
          this.toastService.error('Erro ao buscar dados.');
          this.loadingAutocomplete = false;
        },
      );
    }
  }

  onConsultarButtonClick() {
    const isAnyFilterFilled = this.checkIfFiltersAreFilled();
    if(isAnyFilterFilled){
      this.getListaDePerfis();
    } else{
      this.toastService.warning('Preencha um os filtros antes de buscar.');
    }
  }

  checkIfFiltersAreFilled(): boolean {
    const filters = this.filtrosConsultaListaDePerfis.get('filters');
  
    const searchFilled = filters?.get('search')?.value && filters.get('search')?.value.length > 0;
    const tipoPerfilFilled = filters?.get('tipoPerfil')?.value && filters.get('tipoPerfil')?.value.length > 0;
    const lotacaoFilled = filters?.get('lotacao')?.value !== null;
    const orgaoFilled = filters?.get('orgao')?.value !== null;
    const formularioFilled = filters?.get('formulario')?.value !== null;
  
    return searchFilled || tipoPerfilFilled || lotacaoFilled || orgaoFilled || formularioFilled;
  }

  addTipoPerfilFilter(tipo: tipoPerfil, $event){
    if($event === true){

      switch (tipo) {
        case 'TODOS':
          this.perfilAdm = false;
          this.perfilEmi= false;
          this.perfilEdt = false;
          this.perfilLeitor = false;
          this.tipoPerfilControl.setValue(['ADMINISTRADOR','EMISSOR','EDITOR','LEITOR']);
        break;
        case 'ADMINISTRADOR':
          this.todosTiposDePerfis = false;
          this.tipoPerfilControl.setValue(this.tipoPerfilSelected());
        break;
        case 'EMISSOR':
          this.todosTiposDePerfis = false;
          this.tipoPerfilControl.setValue(this.tipoPerfilSelected());
        break;
        case 'EDITOR':
          this.todosTiposDePerfis = false;
          this.tipoPerfilControl.setValue(this.tipoPerfilSelected());
        break;
        case 'LEITOR':
          this.todosTiposDePerfis = false;
          this.tipoPerfilControl.setValue(this.tipoPerfilSelected());
        break;
        }
    } else {
      switch (tipo) {
        case 'TODOS':
          this.tipoPerfilControl.setValue([]);
          break
        default:
          const newArray = this.tipoPerfilControl.value?.filter(item => item !== tipo);
          if(newArray){
            this.tipoPerfilControl.setValue(newArray);
          } 
        break
      }   
    }
  }

  tipoPerfilSelected(): string[] {
    const perfis:string[] = [];
    if(this.perfilAdm){
      perfis.push('ADMINISTRADOR');
    }
    if(this.perfilEmi){
      perfis.push('EMISSOR');
    }
    if(this.perfilEdt){
      perfis.push('EDITOR');
    }
    if(this.perfilLeitor){
      perfis.push('LEITOR');
    }
    return perfis
  }

  getListaDePerfis() {
    this.loadingOverlayService.setLoading(true);
    this.perfisService
      .getPaginaDeListaDePerfisResumidos(this.filtrosConsultaListaDePerfis.value)
      .pipe(
        finalize(() => {
          this.loadingOverlayService.setLoading(false);
        }),
      )
      .subscribe(
        (result) => {
          this.resultadoConsulta = result;
          this.toggleShowTable = true;
        },
        (error) => {
          this.toastService.error('Erro ao buscar dados.');
          this.loadingOverlayService.setLoading(false);
        },
      );
  }

  novaTabSelecionada(index: number): void {
    if (index === 1 && !this.paginaListaDeSolicitacoes) {
      this.loadingOverlayService.setLoading(true);
      this.perfisService
        .getPaginaDeListaDeSolicitacoesResumidas(this.filtrosConsultaListaDePerfis.value)
        .pipe(
          finalize(() => {
            this.loadingOverlayService.setLoading(false);
          }),
        )
        .subscribe(
          (result) => {
            this.paginaListaDeSolicitacoes = result;
          },
          (error) => {
            this.loadingOverlayService.setLoading(false);
            this.toastService.error('Erro ao buscar dados.');
          },
        );
    }
  }

  resetarFiltros(){
    this.filtrosConsultaListaDePerfis.reset()
    this.todosTiposDePerfis = true;
    this.perfilAdm = false;
    this.perfilEmi = false;
    this.perfilEdt = false;
    this.perfilLeitor = false;
  }
}
