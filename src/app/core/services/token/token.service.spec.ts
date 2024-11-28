import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';

describe('Service: PremissaService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenService],
      imports: [HttpClientTestingModule],
    });

    service = TestBed.get(TokenService);
  });

  it('get works', () => {
    service.get().subscribe(res => {
      expect(res).toStrictEqual({
        accessToken: '',
        userModel: null!,
      });
    });
  });

  it('set works', () => {
    service.set(mockTokenModel);
    service.get().subscribe(res => {
      expect(res).toStrictEqual(mockTokenModel);
    });
  });

  it('clear works', () => {
    service.clear();
    service.get().subscribe(res => {
      expect(res).toStrictEqual({
        accessToken: '',
        userModel: null!,
      });
    });
  });
});
const mockTokenModel = {
  accessToken: 'accessToken',
  userModel: {
    id: 'id',
    username: 'username',
    password: 'password',
  },
};
