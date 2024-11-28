import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, filter } from 'rxjs';
import { FormularioAutocompleteModel } from 'src/app/core/models/formulario-resumo.model';
import { FormulariosService } from 'src/app/core/services/formulario/formularios.service';

@Component({
  selector: 'input-tipo-formulario',
  templateUrl: './input-tipo-formulario.component.html',
  styleUrl: './input-tipo-formulario.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTipoFormularioComponent),
      multi: true,
    },
  ],
})
export class InputTipoFormularioComponent implements ControlValueAccessor, OnInit {
  objInicial: FormularioAutocompleteModel;
  listaFormularios: FormularioAutocompleteModel[] = [];
  searchFormulario = new FormControl('', Validators.required);
  loadingFormAutocomplete = false;

  constructor(
    private toastService: ToastrService,
    private formulariosService: FormulariosService,
  ) {}

  ngOnInit(): void {
    this.searchFormulario.valueChanges
      .pipe(
        debounceTime(300), // Adiciona um debounce de 300ms
        filter(text => text!.length >= 3), // Filtra para disparar a pesquisa apenas com 3 ou mais caracteres
      )
      .subscribe(searchTerm => {
        if (searchTerm) {
          this.buscarFormularios(searchTerm);
        }
      });
  }

  buscarFormularios(term: string): void {
    this.loadingFormAutocomplete = true;
    this.formulariosService.gelListaFormulariosAutocomplete(term).subscribe({
      next: response => {
        this.listaFormularios = response;
      },
      complete: () => {
        this.loadingFormAutocomplete = false;
      },
      error: () => {
        this.toastService.error('Não foi possível buscar lista de usuários');
      },
    });
  }

  autocompleteSelectionChange($event: MatAutocompleteSelectedEvent) {
    this.onChange($event.option.value as FormularioAutocompleteModel);
    this.searchFormulario.setValue($event.option.value.sigla as string, { emitEvent: false });
  }

  // Função que devemos chamar quando o valor interno do componente mudar, avisando assim o componente pai
  // Pra este componente, devemos chamar quando uma permissao é adicionada ou removida, e também quando qualqer valor de uma permissão é alterado
  onChange: (value: FormularioAutocompleteModel) => {};

  // Função que devemos chamar quando queremos avisar ao componente pai que o input foi tocado
  // Pra este componente, devemos chamar quando o select tipo recebe focus, ou qualquer outro input de qualquer outra permissao recebe focus ou quando uma permissao é apagada
  onTouched: () => {};

  // Como que o angular vai setar o valor no seu componente?
  // Como o angular vai gerenciar o que vem de fora para dentro do componente?
  writeValue(obj: FormularioAutocompleteModel): void {
    if (obj !== null) {
      this.listaFormularios.push(obj);
      this.searchFormulario.setValue(obj.sigla, { emitEvent: false });
    }
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
