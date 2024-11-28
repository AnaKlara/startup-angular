import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameAbreviation',
})
export class NameAbreviationPipe implements PipeTransform {
  transform(name: string): string {
    if (name) {
      const splited: string[] = name.split(' ');
      const firstLetters = splited.map(word => word.charAt(0));
      const abreviation = firstLetters.join('');
      return abreviation.substring(0, 2);
    } else {
      return '';
    }
  }
}
