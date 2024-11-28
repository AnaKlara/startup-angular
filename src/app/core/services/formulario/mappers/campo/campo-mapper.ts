import { SelectOption } from 'src/app/core/models/selectOption.model';
import { Mapper } from 'src/app/shared/base/mapper';

import { CampoEntity } from '../../Entities/campo.entity';

export class CampoMapper extends Mapper<CampoEntity, SelectOption> {
  mapFrom(param: CampoEntity): SelectOption {
    return {
      value: param.codigo,
      label: param.campo,
    };
  }
}
