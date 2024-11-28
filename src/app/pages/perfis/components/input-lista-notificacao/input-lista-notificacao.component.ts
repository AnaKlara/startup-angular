import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Notificacao, Periodicidade, Status } from 'src/app/core/services/perfis/entities/perfil.entity';
import { PerfisService } from 'src/app/core/services/perfis/perfis.service';
import { SelectItem } from 'src/app/shared/interfaces/select-item.interface';

@Component({
  selector: 'input-lista-notificacao',
  templateUrl: './input-lista-notificacao.component.html',
  styleUrl: './input-lista-notificacao.component.scss',
})
export class InputListaNotificacaoComponent {
  @Input() perfilForm: FormGroup;

  notificacaoForm: FormGroup;

  get notificacoesFA(): FormArray {
    return this.perfilForm.get('notificacoes') as FormArray;
  }

  periodicidadeEnum = Periodicidade;
  periodicidades: string[] = Object.keys(Periodicidade);

  statusEnum = Status;
  listaStatus: string[] = Object.keys(Status);

  listaCriadoPor: SelectItem[];

  constructor(
    private perfisService: PerfisService,
    private toastService: ToastrService,
    private FB: FormBuilder,
  ) {}

  addNotificacaoToFormArray() {
    const notificacaoForm = new FormGroup({
      codigo: new FormControl(''),
      ativo: new FormControl(true),
      tipoFormulario: new FormControl(null, Validators.required),
      periodicidade: new FormControl('', Validators.required),
      alarmEmail: new FormControl(false),
      alarmPopUp: new FormControl(false),
      status: new FormControl([]),
      criadoPor: new FormControl([]),
    });
    notificacaoForm.get('criadoPor')?.disable();
    this.notificacoesFA.push(notificacaoForm);
  }

  removeNotificacaoFormArray(index: number) {
    this.notificacoesFA.removeAt(index);
  }

  patchValuesToNotificacaoForm(value: Notificacao) {
    if (value.codigo) {
      this.notificacaoForm.get('codigo')?.setValue(value.codigo, { emitEvent: false });
    }
    if (value.ativo) {
      this.notificacaoForm.get('ativo')?.setValue(value.ativo, { emitEvent: false });
    }
    if (value.tipoFormulario) {
      this.notificacaoForm.get('tipoFormulario')?.setValue(value.tipoFormulario);
    }
    if (value.periodicidade) {
      this.notificacaoForm.get('periodicidade')?.setValue(value.periodicidade, { emitEvent: false });
    }
    if (value.alarmEmail) {
      this.notificacaoForm.get('alarmEmail')?.setValue(value.alarmEmail, { emitEvent: false });
    }
    if (value.alarmPopUp) {
      this.notificacaoForm.get('alarmPopUp')?.setValue(value.alarmPopUp, { emitEvent: false });
    }
    if (value.status) {
      this.notificacaoForm.get('status')?.setValue(value.status as never[], { emitEvent: false });
    }
    if (value.criadoPor) {
      this.notificacaoForm.get('criadoPor')?.setValue(value.criadoPor as never[], { emitEvent: false });
    }
  }

  statusFC(index: number): FormControl {
    return this.notificacoesFA.controls?.at(index)?.get('status') as FormControl;
  }

  removeAllStatus(index: number, event: MouseEvent) {
    this.notificacoesFA.controls
      ?.at(index)
      ?.get('status')
      ?.setValue([] as never[]);
    event.stopPropagation();
  }

  siglaForm(index: number) {
    const tipoFormulario = this.notificacoesFA.controls?.at(index)?.get('tipoFormulario')?.value;
    if (tipoFormulario !== null) {
      return this.notificacoesFA.controls?.at(index)?.get('tipoFormulario')?.value.sigla as string;
    } else {
      return null;
    }
  }
}
