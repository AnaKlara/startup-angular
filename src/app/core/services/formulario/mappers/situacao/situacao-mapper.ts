import { SelectOption } from 'src/app/core/models/selectOption.model';
import { Mapper } from 'src/app/shared/base/mapper';

import { SituacaoEntity } from '../../Entities/situacao.entity';

export class SituacaoMapper extends Mapper<SituacaoEntity, SelectOption> {
  mapFrom(param: SituacaoEntity): SelectOption {
    return {
      value: param.codigo,
      label: param.status,
    };
  }
}
