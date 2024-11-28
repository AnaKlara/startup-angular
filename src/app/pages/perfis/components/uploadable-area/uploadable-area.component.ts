import { AfterViewInit, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'uploadable-area',
  templateUrl: './uploadable-area.component.html',
  styleUrl: './uploadable-area.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadableAreaComponent),
      multi: true,
    },
  ],
})
export class UploadableAreaComponent implements ControlValueAccessor, AfterViewInit {
  anexos = new FormControl(['']);
  maxSizeInKB = 500;
  isDragOver = false;
  uploadedFiles: File[] = [];

  // Função que devemos chamar quando o valor interno do componente mudar, avisando assim o componente pai
  // Pra este componente, devemos chamar quando uma permissao é adicionada ou removida, e também quando qualqer valor de uma permissão é alterado
  onChange: (value: string[]) => {};

  // Função que devemos chamar quando queremos avisar ao componente pai que o input foi tocado
  // Pra este componente, devemos chamar quando o select tipo recebe focus, ou qualquer outro input de qualquer outra permissao recebe focus ou quando uma permissao é apagada
  onTouched: () => {};

  constructor(
    private toastService: ToastrService,
    // private uploadFilesService: UploadFilesService
  ) {}

  ngAfterViewInit(): void {
    this.anexos.valueChanges.subscribe(value => {
      this.onChange(value as string[]);
    });
  }

  // Lida com eventos de Drag over
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  // Lida com eventos de Drag leave
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  // Lida com eventos de drop
  // onDrop(event: DragEvent) {
  //   console.log('chegou no on drop');
  //   event.preventDefault();
  //   if (event.dataTransfer && event.dataTransfer.files.length > 0) {
  //     this.uploadFiles(event.dataTransfer.files);
  //   }
  // }

  // Detector de eventos de inserção de arquivo
  onFileSelected(event: DragEvent) {
    event.preventDefault();
    const input = event.dataTransfer as DataTransfer;
    this.isDragOver = false;

    // Valida a quantidade
    if (input.files && input.files.length === 1) {
      const file = input.files[0];

      // Valida o tamanho
      if (file.size > this.maxSizeInKB * 1024) {
        this.toastService.warning(`O arquivo excede o tamanho máximo de ${this.maxSizeInKB} KB`);
        return;
      }

      // Valida o tipo
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        this.toastService.warning(`Só arquivos no formato .jpg ou .png são aceitos`);
        return;
      }

      // O arquivo é válido
      this.anexos.setValue([...(this.anexos.value ?? []), input.files[0].name]);
    } else {
      this.toastService.warning(`Insira 1 arquivo por vez.`);
    }
  }

  // Como que o angular vai setar o valor no seu componente?
  // Como o angular vai gerenciar o que vem de fora para dentro do componente?
  writeValue(obj: any): void {
    //console.log(obj);
    this.anexos.setValue(obj as string[]);
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
