import { Component, Input } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, filter, Subject } from 'rxjs';
import { AtivosService } from 'src/app/core/services/ativos/ativos.service';
import { BlocosService } from 'src/app/core/services/blocos/blocos.service';
import { OrgaosService } from 'src/app/core/services/orgaos/orgaos.service';
import { TipoPerfil } from 'src/app/core/services/perfis/entities/perfil.entity';

type PermissaoTipo = 'orgao' | 'bloco' | 'ativo';

@Component({
  selector: 'input-lista-permissao',
  templateUrl: './input-lista-permissao.component.html',
  styleUrl: './input-lista-permissao.component.scss',
})
export class InputListaPermissaoComponent {
  @Input() permissoes;

  tiposPerfis = [
    { label: 'Administrador', value: TipoPerfil.Administrador },
    { label: 'Editor', value: TipoPerfil.Editor },
    { label: 'Leitor', value: TipoPerfil.Leitor },
  ];

  selectOrgaoAtivoBloco = [
    { label: 'Órgão', value: 'orgao' },
    { label: 'Bloco', value: 'bloco' },
    { label: 'Ativo', value: 'ativo' },
  ];
  selectedOrgaoAtivoBloco;
  autocompleteOrgaoAtivoBlocoloading = false;
  autocompleteOrgaoAtivoBlocoOptions;
  inputAutocomplete: string = '';
  private searchSubject = new Subject<string>();

  constructor(
    private toastrs: ToastrService,
    private orgaosService: OrgaosService,
    private blocosService: BlocosService,
    private ativosService: AtivosService,
    private FB: FormBuilder,
    public controlContainer: ControlContainer,
    public parentForm: FormGroupDirective,
  ) {
    this.searchSubject
      .pipe(
        debounceTime(300), // Adiciona um debounce de 300ms
        filter(text => text.length >= 3), // Filtra para disparar a pesquisa apenas com 3 ou mais caracteres
      )
      .subscribe(searchTerm => {
        this.search(searchTerm);
      });
  }

  onSearch(value: string): void {
    this.searchSubject.next(value);
  }

  search(term: string): void {
    //console.log('Pesquisa realizada com:', term);
    this.autocompleteOrgaoAtivoBlocoloading = true;
    switch (
      this.selectedOrgaoAtivoBloco.value //'orgao' | 'bloco' | 'ativo';
    ) {
      case 'orgao':
        this.orgaosService.orgaosConsulta(term).subscribe({
          next: response => {
            //console.log(response);
            this.autocompleteOrgaoAtivoBlocoOptions = response;
          },
          complete: () => {
            this.autocompleteOrgaoAtivoBlocoloading = false;
          },
          error: () => {
            this.toastrs.error('Não foi possível buscar dados de `${this.selectedOrgaoAtivoBloco.label}s`');
          },
        });
        break;
      case 'bloco':
        this.blocosService.blocosConsulta(term).subscribe({
          next: response => {
            //console.log(response);
            this.autocompleteOrgaoAtivoBlocoOptions = response;
          },
          complete: () => {
            this.autocompleteOrgaoAtivoBlocoloading = false;
          },
          error: () => {
            this.toastrs.error('Não foi possível buscar dados de `${this.selectedOrgaoAtivoBloco.label}s`');
          },
        });
        break;
      case 'ativo':
        this.ativosService.ativosConsulta(term).subscribe({
          next: response => {
            //console.log(response);
            this.autocompleteOrgaoAtivoBlocoOptions = response;
          },
          complete: () => {
            this.autocompleteOrgaoAtivoBlocoloading = false;
          },
          error: () => {
            this.toastrs.error('Não foi possível buscar dados de `${this.selectedOrgaoAtivoBloco.label}s`');
          },
        });
        break;
    }
  }

  get orgaosFA(): FormArray {
    return this.permissoes.get('orgaos') as FormArray;
  }
  get blocosFA(): FormArray {
    return this.permissoes.get('blocos') as FormArray;
  }
  get ativosFA(): FormArray {
    return this.permissoes.get('ativos') as FormArray;
  }

  get autocompleteLabel(): string {
    if (this.selectedOrgaoAtivoBloco) {
      return `Selecione o ${this.selectedOrgaoAtivoBloco.label}`;
    } else {
      return `Selecione o tipo primeiro`;
    }
  }
  get autocopmletePlaceholder(): string {
    if (this.selectedOrgaoAtivoBloco) {
      return `Digite para pesquisar um ${this.selectedOrgaoAtivoBloco.label}`;
    } else {
      return ``;
    }
  }

  addItemToFormArray(itemType: PermissaoTipo, item: { codigo: string; nome: string }) {
    //console.log(itemType);
    //console.log(item);
    const fieldGroup = this.FB.group({
      codigo: new FormControl(item.codigo),
      nome: new FormControl(item.nome),
      formularios: new FormControl([], Validators.required),
      tipoPerfil: new FormControl('L'),
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

  autocompleteSelectionChange($event: MatAutocompleteSelectedEvent) {
    //console.log($event);
    this.addItemToFormArray(this.selectedOrgaoAtivoBloco.value, {
      codigo: $event.option.value.value,
      nome: $event.option.value.label,
    });
    this.resetInputsAutocompleteOrgaoAtivoBloco();
  }

  resetInputsAutocompleteOrgaoAtivoBloco() {
    this.autocompleteOrgaoAtivoBlocoOptions = null;
    this.selectedOrgaoAtivoBloco = null;
    this.inputAutocomplete = '';
  }

  trackByIndexI(index: number, item: any): any {
    return index;
  }
  trackByIndexJ(index: number, item: any): any {
    return index;
  }
  trackByIndexK(index: number, item: any): any {
    return index;
  }

  removeItem(itemType: PermissaoTipo, index: number) {
    switch (
      itemType //'orgao' | 'bloco' | 'ativo';
    ) {
      case 'orgao':
        this.orgaosFA.removeAt(index);
        break;
      case 'bloco':
        this.blocosFA.removeAt(index);
        break;
      case 'ativo':
        this.ativosFA.removeAt(index);
        break;
    }
  }
}
