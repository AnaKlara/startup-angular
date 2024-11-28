import { SelectOption } from 'src/app/core/models/selectOption.model';

import { CampoEntity } from '../../Entities/campo.entity';
import { CampoMapper } from './campo-mapper';

describe('CampoMapper', () => {
  let mapper: CampoMapper;

  beforeEach(() => {
    mapper = new CampoMapper();
  });

  it('should correctly map a CampoEntity to a SelectOption', () => {
    const campoEntity: CampoEntity = {
      codigo: 123,
      campo: 'Field',
    };

    const expectedSelectOption: SelectOption = {
      value: campoEntity.codigo,
      label: campoEntity.campo,
    };

    const result = mapper.mapFrom(campoEntity);

    expect(result).toEqual(expectedSelectOption);
  });
});
