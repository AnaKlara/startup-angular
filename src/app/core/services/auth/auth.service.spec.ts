import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TokenModel } from '../../models/token.model';
import { AuthService } from './auth.service';

describe('Service: AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientTestingModule],
    });

    service = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getToken works', () => {
    let res = {} as TokenModel;
    service.getToken().subscribe((data) => {
      res = data;
    });
    expect(res).toBeDefined();
  });

  it('isAuthenticated works', () => {
    jest.spyOn(service, 'isValid');
    service.isAuthenticated().subscribe((res) => {
      expect(res).toBeFalsy();
    });
    expect(service.isValid).toHaveBeenCalled();
  });

  it('isAuthenticatedOrRefresh com accesToken valido', () => {
    jest.spyOn(service, 'getToken').mockReturnValue(of(mockTokenModel));
    jest.spyOn(service, 'refreshToken').mockReturnValue(of(mockTokenModel));
    jest.spyOn(service, 'isSuccess').mockReturnValue(true);
    jest.spyOn(service, 'isAuthenticated').mockReturnValue(of(true));
    service.isAuthenticatedOrRefresh().subscribe((res) => {
      expect(res).toBeTruthy();
    });

    expect(service.getToken).toHaveBeenCalled();
    expect(service.refreshToken).toHaveBeenCalledWith('JWTStrategy', mockTokenModel);
    expect(service.isSuccess).toHaveBeenCalledWith(mockTokenModel);
    expect(service.isAuthenticated).toHaveBeenCalled();
  });

  it('isAuthenticatedOrRefresh com accesToken invalido', () => {
    jest.spyOn(service, 'getToken').mockReturnValue(of(mockTokenModel));
    jest.spyOn(service, 'refreshToken').mockReturnValue(of(mockTokenModel));
    jest.spyOn(service, 'isSuccess').mockReturnValue(false);
    service.isAuthenticatedOrRefresh().subscribe((res) => {
      expect(res).toBeFalsy();
    });

    expect(service.getToken).toHaveBeenCalled();
    expect(service.refreshToken).toHaveBeenCalledWith('JWTStrategy', mockTokenModel);
    expect(service.isSuccess).toHaveBeenCalledWith(mockTokenModel);
  });

  it('isAuthenticatedOrRefresh sem accesToken', () => {
    let token = { ...mockTokenModel, accessToken: null } as unknown as TokenModel;
    jest.spyOn(service, 'getToken').mockReturnValue(of(token));
    jest.spyOn(service, 'isValid');
    service.isAuthenticatedOrRefresh().subscribe((res) => {
      expect(res).toBeFalsy();
    });

    expect(service.getToken).toHaveBeenCalled();
    expect(service.isValid).toHaveBeenCalledWith(token);
  });

  it('refreshToken works', () => {
    jest.spyOn(service, 'isSuccess').mockReturnValue(true);
    jest.spyOn(service, 'isValid').mockReturnValue(true);
    service.refreshToken('', mockTokenModel).subscribe((res) => {
      expect(res).toStrictEqual(mockTokenModel);
    });
  });

  it('onTokenChange works', () => {
    service.onTokenChange().subscribe((res) => {
      expect(res).toStrictEqual(mockTokenModel);
    });
  });

  it('onAuthenticationChange works', () => {
    jest.spyOn(service, 'isValid').mockReturnValue(true);
    jest.spyOn(service, 'onTokenChange').mockReturnValue(of(mockTokenModel));
    service.onAuthenticationChange().subscribe((res) => {
      expect(res).toStrictEqual(mockTokenModel);
    });
    expect(service.isValid).toHaveBeenCalledWith(mockTokenModel);
  });

  it('logout works', () => {
    service.logout().subscribe((res) => {
      expect(res).toBeFalsy;
    });
  });

  it('isValid works', () => {
    expect(service.isValid(mockTokenModel)).toBeTruthy();
  });

  it('isSuccess works', () => {
    expect(service.isSuccess(mockTokenModel)).toBeTruthy();
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
