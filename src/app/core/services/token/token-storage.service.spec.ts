import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TokenStorageService } from './token-storage.service';

describe('Service: PremissaService', () => {
  let service: TokenStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenStorageService],
      imports: [HttpClientTestingModule],
    });

    service = TestBed.get(TokenStorageService);
  });

  it('get works', () => {
    const res = service.get();
    expect(res).toStrictEqual({
      accessToken: '',
      userModel: null!,
    });
  });

  it('get works', () => {
    service.set(mockTokenModel);
    const res = service.get();
    expect(res).toStrictEqual(mockTokenModel);
  });

  it('clear works', () => {
    service.clear();
    const res = service.get();
    expect(res).toStrictEqual({
      accessToken: '',
      userModel: null!,
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
