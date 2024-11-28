import { SelectOption } from 'src/app/core/models/selectOption.model';
import { Mapper } from 'src/app/shared/base/mapper';

import { AtivoEntity } from '../entities/ativo.entity';

export class AtivoMapper extends Mapper<AtivoEntity, SelectOption> {
  mapFrom(param: AtivoEntity): SelectOption {
    return {
      value: param.id,
      label: param.nome,
    };
  }
}
