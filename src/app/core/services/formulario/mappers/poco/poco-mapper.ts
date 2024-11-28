import { SelectOption } from 'src/app/core/models/selectOption.model';
import { Mapper } from 'src/app/shared/base/mapper';

import { PocoEntity } from '../../Entities/poco.entity';

export class PocoMapper extends Mapper<PocoEntity, SelectOption> {
  mapFrom(param: PocoEntity): SelectOption {
    return {
      value: param.id,
      label: param.descricao,
    };
  }
}
