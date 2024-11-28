import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoPerfil',
})
export class TipoPerfilPipe implements PipeTransform {
  transform(tipoPeril: string): string {
    switch (tipoPeril) {
      case 'A': {
        return 'Administrador';
      }
      case 'L': {
        return 'Leitor';
      }
      case 'E': {
        return 'Editor';
      }
      default: {
        return '';
      }
    }
  }
}
