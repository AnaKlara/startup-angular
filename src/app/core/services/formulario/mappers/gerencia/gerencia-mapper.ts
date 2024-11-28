import { SelectOption } from 'src/app/core/models/selectOption.model';
import { Mapper } from 'src/app/shared/base/mapper';

import { GerenciaEntity } from '../../Entities/gerencia.entity';

export class GerenciaMapper extends Mapper<GerenciaEntity, SelectOption> {
  mapFrom(param: GerenciaEntity): SelectOption {
    return {
      value: param.chave,
      label: param.chave + ' - ' + param.nome,
    };
  }
}
