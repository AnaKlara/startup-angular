import { SelectOption } from 'src/app/core/models/selectOption.model';

import { InstalacaoEntity } from '../../Entities/instalacao.entity';
import { InstalacaoMapper } from './instalacao-mapper';

describe('InstalacaoMapper', () => {
  let mapper: InstalacaoMapper;

  beforeEach(() => {
    mapper = new InstalacaoMapper();
  });

  it('should correctly map an InstalacaoEntity to a SelectOption', () => {
    // Arrange
    const instalacaoEntity: InstalacaoEntity = {
      codigoInstalacao: 123,
      nomeDaInstalacao: 'Installation Name',
      // Add other properties if necessary
    };

    const expectedSelectOption: SelectOption = {
      value: instalacaoEntity.codigoInstalacao,
      label: instalacaoEntity.nomeDaInstalacao,
    };

    // Act
    const result = mapper.mapFrom(instalacaoEntity);

    // Assert
    expect(result).toEqual(expectedSelectOption);
  });
});
