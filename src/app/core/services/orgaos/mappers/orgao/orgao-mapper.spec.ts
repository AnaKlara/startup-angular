import { SelectOption } from 'src/app/core/models/selectOption.model';

import { OrgaoEntity } from '../../entities/orgao.entity';
import { OrgaoMapper } from './orgao-mapper';

describe('OrgaoMapper', () => {
  let mapper: OrgaoMapper;

  beforeEach(() => {
    mapper = new OrgaoMapper();
  });

  it('should correctly map OrgaoEntity to SelectOption', () => {
    const entity: OrgaoEntity = {
      id: 123,
      nome: 'Sample Orgao',
    };

    const expectedOption: SelectOption = {
      value: '123',
      label: 'Sample Orgao',
    };

    const result = mapper.mapFrom(entity);

    expect(result).toEqual(expectedOption);
  });

  it('should handle OrgaoEntity with special characters in name', () => {
    const entity: OrgaoEntity = {
      id: 789,
      nome: 'Orgao with @special #characters!',
    };

    const expectedOption: SelectOption = {
      value: '789',
      label: 'Orgao with @special #characters!',
    };

    const result = mapper.mapFrom(entity);

    expect(result).toEqual(expectedOption);
  });

  it('should handle OrgaoEntity with empty name', () => {
    const entity: OrgaoEntity = {
      id: 101,
      nome: '',
    };

    const expectedOption: SelectOption = {
      value: '101',
      label: '',
    };

    const result = mapper.mapFrom(entity);

    expect(result).toEqual(expectedOption);
  });
});
