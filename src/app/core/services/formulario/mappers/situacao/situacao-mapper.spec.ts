import { SelectOption } from 'src/app/core/models/selectOption.model';

import { SituacaoEntity } from '../../Entities/situacao.entity';
import { SituacaoMapper } from './situacao-mapper';

describe('SituacaoMapper', () => {
  let mapper: SituacaoMapper;

  beforeEach(() => {
    mapper = new SituacaoMapper();
  });

  it('should correctly map a SituacaoEntity to a SelectOption', () => {
    const situacaoEntity: SituacaoEntity = {
      codigo: 'status123',
      status: 'Active',
    };

    const expectedSelectOption: SelectOption = {
      value: situacaoEntity.codigo,
      label: situacaoEntity.status,
    };

    const result = mapper.mapFrom(situacaoEntity);

    expect(result).toEqual(expectedSelectOption);
  });
});
