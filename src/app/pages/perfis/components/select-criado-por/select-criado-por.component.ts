import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PerfisService } from 'src/app/core/services/perfis/perfis.service';
import { SelectItem } from 'src/app/shared/interfaces/select-item.interface';

@Component({
  selector: 'select-criado-por',
  templateUrl: './select-criado-por.component.html',
  styleUrl: './select-criado-por.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectCriadoPorComponent),
      multi: true,
    },
  ],
})
export class SelectCriadoPorComponent implements ControlValueAccessor, OnInit {

  @Input() siglaFormulario: string | null;
  criadoPor = new FormControl([], Validators.required);
  listaCriadoPor: SelectItem[];

  // Função que devemos chamar quando o valor interno do componente mudar, avisando assim o componente pai
  // Pra este componente, devemos chamar quando uma permissao é adicionada ou removida, e também quando qualqer valor de uma permissão é alterado
  onChange: (value: string[]) => {};

  // Função que devemos chamar quando queremos avisar ao componente pai que o input foi tocado
  // Pra este componente, devemos chamar quando o select tipo recebe focus, ou qualquer outro input de qualquer outra permissao recebe focus ou quando uma permissao é apagada
  onTouched: () => {};

  constructor(
    private perfisService: PerfisService,
    private toastService: ToastrService,
  ) {
  }

  ngOnInit(): void {
    if(this.siglaFormulario){
      this.buscarUsuariosPorSiglaDeFormulario(this.siglaFormulario)
    } else {
      this.criadoPor.disable();
    }
    this.criadoPor.valueChanges.subscribe(value => {
      this.onChange(value as string[]);
    });
  }

  ngOnChanges() {
    // Essa função pode detectar mudanças na variável que chega no @Input()
    // Se `siglaFormulario` for definido, habilita o componente, senão, desabilita
    if(this.siglaFormulario){
      this.buscarUsuariosPorSiglaDeFormulario(this.siglaFormulario)
    }
  }

  // Como que o angular vai setar o valor no seu componente?
  // Como o angular vai gerenciar o que vem de fora para dentro do componente?
  writeValue(obj: string[]): void {
    this.criadoPor.setValue(obj as never[],{ emitEvent: false });
    if(obj){
      this.criadoPor.enable({ emitEvent: false });
    }
  }

  // Assim que o componente é criado, o Angular envia uma função para nós chamarmos quando o componente mudar de valor
  // Devemos salvar a função na variável onChange para chamarmos posteriormente.
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }


  // Assim que o componente é criado, o Angular envia uma função para nós chamarmos quando o componente for tocado
  // Devemos salvar a função na variável on touched para chamarmos posteriormente.
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if(isDisabled){
      this.criadoPor.disable({ emitEvent: false });
    } else{
      this.criadoPor.enable({ emitEvent: false });
    }
  }
  
  buscarUsuariosPorSiglaDeFormulario(formularioSigla: string){
    this.perfisService.getPerfilByFormulario(formularioSigla)
    .subscribe(
      (next) => {
        this.listaCriadoPor = next.map(user => ({
          value: user.value,
          viewValue: user.label
        }));;
      },
      (error) => {
        this.toastService.error('Erro ao buscar dados.');
      },
    );
    this.criadoPor.enable();
  }

  removeAllCriadorPor(event){
    this.criadoPor.setValue([]);
    // this.onChange([]);
    event.stopPropagation();
  }
}
