import { SelectOption } from 'src/app/core/models/selectOption.model';

import { LicencaEntity } from '../../Entities/licenca.entity';
import { LicencaMapper } from './licenca-mapper';

describe('LicencaMapper', () => {
  let mapper: LicencaMapper;

  beforeEach(() => {
    mapper = new LicencaMapper();
  });

  it('should correctly map a LicencaEntity to a SelectOption', () => {
    const licencaEntity: LicencaEntity = {
      codigoLicenca: 'licenca123',
      nomeLicenca: 'License Name',
    };

    const expectedSelectOption: SelectOption = {
      value: licencaEntity.codigoLicenca,
      label: licencaEntity.nomeLicenca,
    };

    const result = mapper.mapFrom(licencaEntity);

    expect(result).toEqual(expectedSelectOption);
  });
});
