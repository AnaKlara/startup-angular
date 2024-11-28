import { SelectOption } from 'src/app/core/models/selectOption.model';

import { GerenciaEntity } from '../../Entities/gerencia.entity';
import { GerenciaMapper } from './gerencia-mapper';

describe('GerenciaMapper', () => {
  let mapper: GerenciaMapper;

  beforeEach(() => {
    mapper = new GerenciaMapper();
  });

  it('should correctly map a GerenciaEntity to a SelectOption', () => {
    const gerenciaEntity: GerenciaEntity = {
      chave: 'key123',
      nome: 'Gerencia Name',
    };

    const expectedSelectOption: SelectOption = {
      value: gerenciaEntity.chave,
      label: `${gerenciaEntity.chave} - ${gerenciaEntity.nome}`,
    };

    const result = mapper.mapFrom(gerenciaEntity);

    expect(result).toEqual(expectedSelectOption);
  });
});
