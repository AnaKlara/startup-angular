import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormularioPerfil } from 'src/app/core/models/perfil.model';

@Pipe({
  name: 'formularioQtd',
})
export class FormularioQtdPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: FormularioPerfil[]): SafeHtml {
    if (!value) return value;

    const chipStyle =
      'style="display: inline-block; background-color:#EDF2FF; height:24px; border-radius: 32px; padding: 2px 10px; color: #5D667D; line-height:20px; "';

    if (value.length > 3) {
      const rest = value.length - 3;
      return this.sanitizer.bypassSecurityTrustHtml(`
      <p ${chipStyle} >${value[0].nome}</p>
      <p ${chipStyle}>${value[1].nome}</p>
      <p ${chipStyle}>${value[2].nome}</p>
      <p ${chipStyle}>+${rest}</p>
      `);
    } else {
      return this.sanitizer.bypassSecurityTrustHtml(
        `      <p ${chipStyle} >${value[0].nome}</p>
      <p ${chipStyle}>${value[1].nome}</p>
      <p ${chipStyle}>${value[2].nome}</p>`,
      );
    }
  }
}
