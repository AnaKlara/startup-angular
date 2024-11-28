import { SelectOption } from 'src/app/core/models/selectOption.model';
import { Mapper } from 'src/app/shared/base/mapper';

import { UsuarioEntity } from '../../Entities/usuario.entity';

export class UsuarioMapper extends Mapper<UsuarioEntity, SelectOption> {
  mapFrom(param: UsuarioEntity): SelectOption {
    return {
      value: param.chave,
      label: param.chave + ' - ' + param.nome,
    };
  }
}
