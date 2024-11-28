import { SelectOption } from 'src/app/core/models/selectOption.model';

import { UsuarioEntity } from '../../Entities/usuario.entity';
import { UsuarioMapper } from './usuario-mapper';

describe('UsuarioMapper', () => {
  let mapper: UsuarioMapper;

  beforeEach(() => {
    mapper = new UsuarioMapper();
  });

  it('should correctly map a UsuarioEntity to a SelectOption', () => {
    const usuarioEntity: UsuarioEntity = {
      chave: 'user123',
      nome: 'User Name',
    };

    const expectedSelectOption: SelectOption = {
      value: usuarioEntity.chave,
      label: `${usuarioEntity.chave} - ${usuarioEntity.nome}`,
    };

    const result = mapper.mapFrom(usuarioEntity);

    expect(result).toEqual(expectedSelectOption);
  });
});
