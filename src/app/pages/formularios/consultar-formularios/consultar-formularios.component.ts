import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, filter, map } from 'rxjs/operators';
import {
  RequestListaFormularioResumoModel,
  ResponsePageOfListaFormularioResumoModel,
} from 'src/app/core/models/formulario-resumo.model';
import { SelectOption } from 'src/app/core/models/selectOption.model';
import { FormulariosService } from 'src/app/core/services/formulario/formularios.service';
import { Breadcrumb } from 'src/app/shared/components/breadcrumb/breadcrumb.model';
import { dateRangeValidator } from 'src/app/shared/form-validators/date-range-validator';
import { tagSelecionada, tagsList } from '../../../core/models/formulario-input-tag.model';

@Component({
  selector: 'consultar-formularios',
  templateUrl: './consultar-formularios.component.html',
  styleUrl: './consultar-formularios.component.scss',
})
export class ConsultarFormulariosComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [
    { label: 'Home', url: '/home' },
    { label: 'Consultar formulários', url: '/' },
  ];
  tagsList = tagsList;
  tagSelecionada: tagSelecionada = {
    tagName: '',
    tagNameView: '',
  };

  searchControl = new FormControl('');

  selectOptionsList: SelectOption[] = [];
  valoresSelecionados: { [key: string]: SelectOption[] } = {
    situacaoArquivo: [],
    orgaoResponsavel: [],
    gerenciaResponsavel: [],
    chaveUsuario: [],
    campo: [],
    poco: [],
    instalacao: [],
    licenca: [],
  };
  visualizarSelecionados = false;
  isSerachTagContainerOpen = false; // false
  loading: boolean = false;

  filtro = new FormGroup(
    {
      dataInicio: new FormControl<Date | null>(null, [Validators.required]),
      dataFim: new FormControl<Date | null>(null, [Validators.required, this.hasErrorDateRangeExceeded(90)]),
      dataCriacao: new FormControl<Boolean>(false),
      dataEnvio: new FormControl<Boolean>(false),
      tags: new FormGroup({
        nomeFormulario: new FormControl<string | null>(null),
        nomeArquivo: new FormControl<string | null>(null),
        situacaoArquivo: new FormControl<string[] | null>([]),
        orgaoResponsavel: new FormControl<string[] | null>([]),
        gerenciaResponsavel: new FormControl<string[] | null>([]),
        chaveUsuario: new FormControl<string[] | null>([]),
        conteudoXML: new FormControl<string | null>(null),
        campo: new FormControl<string[] | null>([]),
        poco: new FormControl<string[] | null>([]),
        instalacao: new FormControl<string[] | null>([]),
        licenca: new FormControl<string[] | null>([]),
      }),
      page: new FormControl<number>(0),
      pageSize: new FormControl<number>(10),
    },
    { validators: [dateRangeValidator(90)] },
  );
  pageOfListaFormularioResumo: ResponsePageOfListaFormularioResumoModel;

  constructor(
    private el: ElementRef,
    private formulariosService: FormulariosService,
    private toastService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        map((value) => value || ''), // Transforma null em string vazia
        filter((value) => value.length >= 3),
      )
      .subscribe((value) => {
        this.search(value);
      });
  }

  get tagFormControlGroup() {
    return this.filtro.get('tags') as FormGroup;
  }

  get isButtonConsultarDisabled(): boolean {
    if (
      this.filtro.controls.dataInicio.value === null ||
      this.filtro.controls.dataFim.value === null ||
      this.isAnyTagFieldFilled === false
    ) {
      return true;
    } else {
      return false;
    }
  }

  get isAnyTagFieldFilled(): boolean {
    // console.log(this.isAnyTagArrayFilled);
    // console.log();
    return this.isAnyTagArrayFilled || this.isAnyTagStringControlFilled;
  }

  get isAnyTagArrayFilled() {
    const tagsGroup = this.filtro.get('tags') as FormGroup;
    // console.log(tagsGroup.value);
    return (
      tagsGroup.controls['situacaoArquivo'].value?.length !== 0 ||
      tagsGroup.controls['orgaoResponsavel'].value?.length !== 0 ||
      tagsGroup.controls['gerenciaResponsavel'].value?.length !== 0 ||
      tagsGroup.controls['chaveUsuario'].value?.length !== 0 ||
      tagsGroup.controls['campo'].value?.length !== 0 ||
      tagsGroup.controls['poco'].value?.length !== 0 ||
      tagsGroup.controls['instalacao'].value?.length !== 0 ||
      tagsGroup.controls['licenca'].value?.length !== 0
    );
  }

  get isAnyTagStringControlFilled() {
    const tagsGroup = this.filtro.get('tags') as FormGroup;
    return (
      tagsGroup.controls['nomeFormulario'].value !== null ||
      tagsGroup.controls['nomeArquivo'].value !== null ||
      tagsGroup.controls['conteudoXML'].value !== null
    );
  }

  get placeholderInputText() {
    switch (this.tagSelecionada.tagName) {
      case 'nomeFormulario':
        return 'Busque um termo para o Nome do formulário e aperte Enter.';

      case 'nomeArquivo':
        return 'Busque um termo para o Nome do arquivo e aperte Enter.';

      case 'situacaoArquivo':
        return 'Selecione as opções de Situação do Arquivo';

      case 'orgaoResponsavel':
        return 'Busque um termo e selecione as opções de Orgão Responsável';

      case 'gerenciaResponsavel':
        return 'Busque um termo e selecione as opções da Gerência Responsável';

      case 'chaveUsuario':
        return 'Busque um termo e selecione as opções de Chave do Usuário';

      case 'conteudoXML':
        return 'Busque um termo para o Conteúdo do XML e aperte Enter.';

      case 'campo':
        return 'Busque um termo e selecione as opções de Campo';

      case 'poco':
        return 'Busque um termo e selecione as opções de Poço';

      case 'instalacao':
        return 'Busque um termo e selecione as opções de Instalação';

      case 'licenca':
        return 'Busque um termo e selecione as opções de Lincença';
      case '':
        return '';
    }
  }

  search(query: string) {
    // Lógica de busca aqui
    // console.log('Search query:', query);
    if (query.length >= 3) {
      this.loading = true;
      switch (this.tagSelecionada.tagName) {
        case 'nomeFormulario':
          // console.log('Texto livre.');
          this.loading = false;
          break;
        case 'nomeArquivo':
          // console.log('Texto livre.');
          this.loading = false;
          break;
        case 'situacaoArquivo':
          // neste caso buscamos as opções do back sem precisar pesquisar

          // console.log('pesquisando situacao Do Arquivo');
          // this.formulariosService.situacoesConsulta(query).subscribe({
          //   next: (response) => {
          //     if (this.tagSelecionada.tagName === 'situacaoArquivo') {
          //       this.selectOptionsList = response;
          //     }
          //   },
          //   complete: () => {
          //     this.loading = false;
          //   },
          //   error: () => {
          //     this.toastService.error('Não foi possível buscar dados de `${this.tagSelecionada.tagNameView}`');
          //   },
          // });
          break;
        case 'orgaoResponsavel':
          // console.log('pesquisando orgao Responsavel');
          this.formulariosService.orgaosConsulta(query).subscribe({
            next: (response) => {
              if (this.tagSelecionada.tagName === 'orgaoResponsavel') {
                this.selectOptionsList = response;
              }
            },
            complete: () => {
              this.loading = false;
            },
            error: () => {
              this.toastService.error('Não foi possível buscar dados de `${this.tagSelecionada.tagNameView}`');
            },
          });
          break;
        case 'gerenciaResponsavel':
          // console.log('pesquisando gerencia Responsavel');
          this.formulariosService.gerenciasConsulta(query).subscribe({
            next: (response) => {
              if (this.tagSelecionada.tagName === 'gerenciaResponsavel') {
                this.selectOptionsList = response;
              }
            },
            complete: () => {
              this.loading = false;
            },
            error: () => {
              this.toastService.error('Não foi possível buscar dados de `${this.tagSelecionada.tagNameView}`');
            },
          });
          break;
        case 'chaveUsuario':
          // console.log('pesquisando chave Usuario');
          this.formulariosService.usuariosConsulta(query).subscribe({
            next: (response) => {
              if (this.tagSelecionada.tagName === 'chaveUsuario') {
                this.selectOptionsList = response;
              }
            },
            complete: () => {
              this.loading = false;
            },
            error: () => {
              this.toastService.error('Não foi possível buscar dados de `${this.tagSelecionada.tagNameView}`');
            },
          });
          break;
        case 'conteudoXML':
          this.loading = false;
          // console.log('Texto livre.');
          break;
        case 'campo':
          // console.log('pesquisando campo');
          this.formulariosService.camposConsulta(query).subscribe({
            next: (response) => {
              this.selectOptionsList = response;
            },
            complete: () => {
              this.loading = false;
            },
            error: () => {
              this.toastService.error('Não foi possível buscar dados de `${this.tagSelecionada.tagNameView}`');
            },
          });
          break;
        case 'poco':
          // console.log('pesquisando poco');
          this.formulariosService.pocosConsulta(query).subscribe({
            next: (response) => {
              if (this.tagSelecionada.tagName === 'poco') {
                this.selectOptionsList = response;
              }
            },
            complete: () => {
              this.loading = false;
            },
            error: () => {
              this.toastService.error('Não foi possível buscar dados de `${this.tagSelecionada.tagNameView}`');
            },
          });
          break;
        case 'instalacao':
          // console.log('pesquisando instalacao');
          this.formulariosService.instalacoesConsulta(query).subscribe({
            next: (response) => {
              if (this.tagSelecionada.tagName === 'instalacao') {
                this.selectOptionsList = response;
              }
            },
            complete: () => {
              this.loading = false;
            },
            error: () => {
              this.toastService.error('Não foi possível buscar dados de `${this.tagSelecionada.tagNameView}`');
            },
          });
          break;

        case 'licenca':
          // console.log('pesquisando licenca');
          this.formulariosService.licencasConsulta(query).subscribe({
            next: (response) => {
              if (this.tagSelecionada.tagName === 'licenca') {
                this.selectOptionsList = response;
              }
            },
            complete: () => {
              this.loading = false;
            },
            error: () => {
              this.toastService.error('Não foi possível buscar dados de `${this.tagSelecionada.tagNameView}`');
            },
          });
          break;
      }
    }
  }

  hasErrorDateRangeExceeded(maxDays: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!!control.value && this.filtro.controls.dataInicio.value) {
        const start = this.filtro.controls.dataInicio.value;
        const end = control.value;

        const dataInicial = new Date(start);
        const dataFinal = new Date(end);

        if (dataInicial && dataFinal) {
          const diffInMs = new Date(dataFinal).getTime() - new Date(dataInicial).getTime();
          const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
          return diffInDays > maxDays ? { dateRangeExceeded: true } : null;
        } else {
          return null;
        }
      }
      return null;
    };
  }

  onClickOnInputTag() {
    this.isSerachTagContainerOpen = true;
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: MouseEvent): void {
    const clickedInside = this.el.nativeElement.querySelector('#input-text-container').contains(event.target);
    if (!clickedInside) {
      this.onClickOutInputTag();
    }
  }

  onClickOutInputTag() {
    this.isSerachTagContainerOpen = false;
    this.searchControl.setValue('');
    this.selectOptionsList = [];
    this.tagSelecionada = {
      tagName: 'nomeFormulario',
      tagNameView: 'Nome do Formulário',
    };
    if (this.isSerachTagContainerOpen) {
      setTimeout(() => {
        document.getElementById('input-filter')!.style!.display! = 'block';
      }, 500); // Pequeno atraso para garantir que o display seja aplicado antes da transição
    } else {
      setTimeout(() => {
        const inputFilter = document.getElementById('input-filter');
        if (inputFilter) {
          inputFilter.style.display = 'none';
        }
      }, 300); // Esperar a transição terminar antes de definir display: none
    }
  }

  novaTagSelecionada(tag: tagSelecionada) {
    this.tagSelecionada = tag;
    this.searchControl.setValue('');
    this.selectOptionsList = [];
    this.visualizarSelecionados = false;
    this.loading = false;

    if (this.tagSelecionada.tagName === 'situacaoArquivo') {
      this.loading = true;
      this.formulariosService.situacoesConsulta().subscribe({
        next: (response) => {
          if (this.tagSelecionada.tagName === 'situacaoArquivo') {
            this.selectOptionsList = response;
          }
        },
        complete: () => {
          this.loading = false;
        },
        error: () => {
          this.toastService.error('Não foi possível buscar dados de `${this.tagSelecionada.tagNameView}`');
        },
      });
    }
  }

  toggleOpcaoCheckbox(event: any, selectOption: SelectOption, tagSelecionada = this.tagSelecionada) {
    // console.log(selectOption);
    if (event.checked) {
      // console.log('Selecionado:', selectOption.value);
      this.adicionarValor(tagSelecionada.tagName, selectOption);
      this.addOrRemoveTag(tagSelecionada.tagName, selectOption, true);
    } else {
      // console.log('Desselecionado:', selectOption.value);
      this.removerValor(tagSelecionada.tagName, selectOption);
      this.addOrRemoveTag(tagSelecionada.tagName, selectOption, false);
    }
    //console.log(this.valoresSelecionados[this.tagSelecionada.tagName]);
  }

  addOrRemoveTag(controlName: string, selectOption: SelectOption, add: boolean): void {
    const tagsGroup = this.filtro.get('tags') as FormGroup;
    const control = tagsGroup.get(controlName) as FormControl;

    if (control) {
      const currentValues = (control.value as string[]) || [];

      if (add) {
        const isDuplicate = control.value?.some((item) => item === selectOption.value);
        if (!isDuplicate) {
          control.setValue([...currentValues, selectOption.value]);
        } else {
          this.toastService.warning('Esse critério já consta no filtro. ');
        }
      } else {
        control.setValue(currentValues.filter((v) => v !== selectOption.value));
      }
    }
    // console.log(tagsGroup.value);
  }

  onEnterInsideInput($event) {
    $event.preventDefault();
    // console.log('clicou em enter');
    const tagsGroup = this.filtro.get('tags') as FormGroup;
    const control = tagsGroup.get(this.tagSelecionada.tagName) as FormControl;
    if (this.searchControl.value?.length !== 0) {
      switch (this.tagSelecionada.tagName) {
        case 'nomeFormulario':
          control.setValue(this.searchControl.value);
          this.searchControl.setValue('');
          break;
        case 'nomeArquivo':
          control.setValue(this.searchControl.value);
          this.searchControl.setValue('');
          break;
        case 'conteudoXML':
          control.setValue(this.searchControl.value);
          this.searchControl.setValue('');
          break;
      }
    }
    // console.log(tagsGroup.value);
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  isString(value: any): boolean {
    return typeof value === 'string';
  }

  apagarValoresDaTag(controlName: string) {
    const tagsGroup = this.filtro.get('tags') as FormGroup;
    const control = tagsGroup.get(controlName) as FormControl;

    if (control) {
      //control.reset();
      if (this.isArray(control.value)) {
        control.setValue([]);
      }
      if (this.isString(control.value)) {
        control.setValue(null);
      }

      this.valoresSelecionados[controlName] = [];

      if (controlName == this.tagSelecionada.tagName) {
        this.selectOptionsList = [];
      }
    }
  }

  adicionarValor(tagName: string, valor: SelectOption) {
    const isDuplicate = this.valoresSelecionados[tagName].some((item) => item.value === valor.value);
    // console.log('É duplicado????');
    // console.log(isDuplicate);
    if (!isDuplicate) {
      this.valoresSelecionados[tagName].push(valor);
    }
  }
  removerValor(tagName: string, valor: SelectOption) {
    const array = this.valoresSelecionados[tagName];
    if (array) {
      // console.log('irá remover o valor ', valor.value);
      this.valoresSelecionados[tagName] = array.filter((item) => item.value !== valor.value);
      // console.log('removeu?? ', this.valoresSelecionados[tagName]);
    }
  }

  recuperarDadosDaTag(tagName: string) {
    this.tagSelecionada = this.getTagByName(tagName);

    this.searchControl.reset();
    if (tagName !== 'nomeFormulario' && tagName !== 'nomeArquivo' && tagName !== 'conteudoXML') {
      this.visualizarSelecionados = true;
      this.selectOptionsList = this.valoresSelecionados[tagName];
    }
  }

  getTagByName(tagName: string): tagSelecionada {
    return tagsList.find((tag) => tag.tagName === tagName)!;
  }

  alreadyExits(valor: SelectOption) {
    return this.valoresSelecionados[this.tagSelecionada.tagName].some((item) => item.value === valor.value)!;
  }

  getSelectionNameByValue(tagName, value) {
    // console.log(tagName, value);
    return this.valoresSelecionados[tagName].find((item) => item.value === value)?.label;
  }

  clicouConsultar() {
    if (this.filtro.valid) {
      this.buscarListaFormularios(this.filtro.value as RequestListaFormularioResumoModel);
    }
  }

  buscarListaFormularios(filtro: RequestListaFormularioResumoModel) {
    this.formulariosService.getListaFormulariosResumo(filtro).subscribe({
      next: (response) => {
        this.pageOfListaFormularioResumo = response;
      },
      complete: () => {},
      error: () => {
        this.toastService.error('Não foi possível buscar formulários');
      },
    });
  }

  get filtroCastModel() {
    return this.filtro.value as RequestListaFormularioResumoModel;
  }
}
