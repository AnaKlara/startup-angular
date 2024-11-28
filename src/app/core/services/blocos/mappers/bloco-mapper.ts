import { SelectOption } from 'src/app/core/models/selectOption.model';
import { Mapper } from 'src/app/shared/base/mapper';

import { BlocoEntity } from '../entities/bloco.entity';

export class BlocoMapper extends Mapper<BlocoEntity, SelectOption> {
  mapFrom(param: BlocoEntity): SelectOption {
    return {
      value: param.id,
      label: param.nome,
    };
  }
}
