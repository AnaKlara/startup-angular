import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, filter } from 'rxjs';
import { FormulariosService } from 'src/app/core/services/formulario/formularios.service';
import { FormularioResumo } from 'src/app/core/services/perfis/entities/perfil.entity';

@Component({
  selector: 'input-chips-lista-formulario',
  templateUrl: './input-chips-lista-formulario.component.html',
  styleUrl: './input-chips-lista-formulario.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputChipsListaFormularioComponent),
      multi: true,
    },
  ],
})
export class InputChipsListaFormularioComponent implements ControlValueAccessor, OnInit {
  
  formulariosArray : FormControl = new FormControl([], Validators.required); //FormularioResumo[] = [];

  // configuração do input chip: ***não*** irá inserir palavras como uma chip em eventos Blur
  addOnBlur = false;

  
  // Função que devemos chamar quando o valor interno do componente mudar, avisando assim o componente pai
  // Pra este componente, devemos chamar quando qualquer chip é adicionada ou removida
  onChange: (value: FormularioResumo[]) => {};

  // Função que devemos chamar quando queremos avisar ao componente pai que o input foi tocado
  // Pra este componente, devemos chamar quando o input tipo recebe focus
  onTouched: () => {};

  inputTextSearch = new FormControl('');
  formulariosAutocompleteOptions: FormularioResumo[];
  loadingAutocomplete = false;
  optionTodos = {
    codigo: '007',
    sigla: 'Todos',
    descricao: ''
  }

  constructor(
    private toastService: ToastrService,
    private formulariosService: FormulariosService,
  ) {
    this.inputTextSearch.valueChanges
      .pipe(
        debounceTime(300), // 300ms debounce
        filter((changedValue) => changedValue!.length >= 3), // pesquisa apenas com 3 ou mais caracteres
      )
      .subscribe((searchTerm) => {
        this.searchFormulariosOptions(searchTerm);
      });
  }

  ngOnInit(): void {
    this.formulariosArray.valueChanges.subscribe(data => this.onChange(data));
  }

  get formularios(){
    return this.formulariosArray.value;
  }

  searchFormulariosOptions(term: string | null | undefined): void {
    this.loadingAutocomplete = true;
    if (term) {
      this.formulariosService.gelListaFormulariosAutocomplete(term).subscribe(
        (next) => {
          this.loadingAutocomplete = false;
          this.formulariosAutocompleteOptions = next;
        },
        (error) => {
          this.toastService.error('Erro ao buscar formulários.');
          this.loadingAutocomplete = false;
        },
      );
    }
  }

  onSelectedOptionEvent(formulario: FormularioResumo){
    const array = this.formulariosArray.value;
    const formularioJaEstaNoArray = array.some(obj => obj.codigo === formulario.codigo);
    let novoArray = array;

    if (!formularioJaEstaNoArray ) {
      novoArray.push(formulario);
      this.formulariosArray.setValue(novoArray);
      this.inputTextSearch.setValue("");
    } else {
      this.toastService.warning('Este formulário já foi inserido.');
    }

    // remover chip todos
    const index =  novoArray.findIndex(item => item.codigo == this.optionTodos.codigo);
    if (index !== -1) {
      this.formulariosArray.setValue(novoArray.splice(index, 1));
    }
  }

  onTodosOptionSelected(){
    this.removeAllChips();
    const novoArray = [this.optionTodos]
    this.formulariosArray.setValue(novoArray);
  }

  remove(formulario: FormularioResumo): void {
    const index = this.formulariosArray.value.indexOf(formulario);
    if (index !== -1) {
      this.formulariosArray.value.splice(index, 1);
    }
  }

  removeAllChips(){
    this.formulariosArray.setValue([]);
  }

  // Como que o angular vai setar o valor no seu componente?
  // Como o angular vai gerenciar o que vem de fora para dentro do componente?
  writeValue(value: FormularioResumo[]): void {
    //console.log(value)
    this.formulariosArray.setValue(value , {emitEvent: false});
  }

  // Assim que o componente é criado, o Angular envia uma função para nós chamarmos quando o componente mudar de valor
  // Devemos salvar a função para chamarmos posteriormente.
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Assim que o componente é criado, o Angular envia uma função para nós chamarmos quando o componente for tocado
  // Devemos salvar a função para chamarmos posteriormente.
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
