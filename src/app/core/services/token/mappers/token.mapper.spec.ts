import { TokenModel } from 'src/app/core/models/token.model';

import { TokenEntity } from '../entities/token-entity';
import { TokenMapper } from './token.mapper';

describe('TokenMapper', () => {
  let mapper: TokenMapper;

  beforeEach(() => {
    mapper = new TokenMapper();
  });

  describe('mapFrom', () => {
    it('should map TokenEntity to TokenModel correctly', () => {
      const tokenEntity: TokenEntity = {
        accessToken: 'sampleAccessToken123',
        userModel: {
          id: 'user1',
          username: 'John Doe',
          password: '12345678',
        },
      };

      const expectedTokenModel: TokenModel = {
        accessToken: 'sampleAccessToken123',
        userModel: { id: 'user1', username: 'John Doe', password: '12345678' },
      };

      const result = mapper.mapFrom(tokenEntity);
      expect(result).toEqual(expectedTokenModel);
    });
  });

  describe('mapTo', () => {
    it('should map TokenModel to TokenEntity correctly', () => {
      const tokenModel: TokenModel = {
        accessToken: 'sampleAccessToken123',
        userModel: { id: 'user1', username: 'John Doe', password: '12345678' },
      };

      const expectedTokenEntity: TokenEntity = {
        accessToken: 'sampleAccessToken123',
        userModel: { id: 'user1', username: 'John Doe', password: '12345678' },
      };

      const result = mapper.mapTo(tokenModel);
      expect(result).toEqual(expectedTokenEntity);
    });
  });
});
