import { SelectOption } from 'src/app/core/models/selectOption.model';
import { Mapper } from 'src/app/shared/base/mapper';

import { OrgaoEntity } from '../../entities/orgao.entity';

export class OrgaoMapper extends Mapper<OrgaoEntity, SelectOption> {
  mapFrom(param: OrgaoEntity): SelectOption {
    return {
      value: String(param.id),
      label: param.nome,
    };
  }
}
