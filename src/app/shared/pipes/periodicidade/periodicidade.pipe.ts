import { Pipe, PipeTransform } from '@angular/core';
import { Periodicidade } from 'src/app/core/services/perfis/entities/perfil.entity';

@Pipe({
  name: 'periodicidade',
})
export class PeriodicidadePipe implements PipeTransform {
  transform(periodo: Periodicidade): string {
    switch (periodo) {
      case '1H': {
        return 'a cada 1h';
      }
      case '1D': {
        return 'a cada 1d';
      }
      case '1S': {
        return 'a cada semana';
      }
      default: {
        return '';
      }
    }
  }
}

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
