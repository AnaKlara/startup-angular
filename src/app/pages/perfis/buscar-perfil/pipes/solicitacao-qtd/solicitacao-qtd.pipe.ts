import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'solicitacaoQtd',
})
export class SolicitacaoQtdPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string[]): SafeHtml {
    if (!value) return value;

    const chipStyle =
      'style="display: inline-block; background-color:#EDF2FF; height:24px; border-radius: 32px; padding: 2px 10px; color: #5D667D; line-height:20px; "';

    if (value.length > 2) {
      const rest = value.length - 2;
      return this.sanitizer.bypassSecurityTrustHtml(`
      <p ${chipStyle} >${value[0]}</p>
      <p ${chipStyle}>${value[1]}</p>
      <p ${chipStyle}>+${rest}</p>
      `);
    } else {
      let chips: string = '';
      for (const solicitacao of value) {
        chips = chips + `<p ${chipStyle} >${solicitacao}</p>`;
      }
      return this.sanitizer.bypassSecurityTrustHtml(chips);
    }
  }
}
