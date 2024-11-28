import { SelectOption } from 'src/app/core/models/selectOption.model';

import { PocoEntity } from '../../Entities/poco.entity';
import { PocoMapper } from './poco-mapper';

describe('PocoMapper', () => {
  let mapper: PocoMapper;

  beforeEach(() => {
    mapper = new PocoMapper();
  });

  it('should correctly map a PocoEntity to a SelectOption', () => {
    const pocoEntity: PocoEntity = {
      id: 123,
      descricao: 'Description of Poco',
    };

    const expectedSelectOption: SelectOption = {
      value: pocoEntity.id,
      label: pocoEntity.descricao,
    };

    const result = mapper.mapFrom(pocoEntity);

    expect(result).toEqual(expectedSelectOption);
  });
});
