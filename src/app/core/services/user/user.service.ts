import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
import { UserEntity } from './entities/user-entity';
import { UserMapper } from './mappers/user.mapper';

@Injectable({
  providedIn: 'root',
})
export class User {
  userMapper = new UserMapper();

  constructor(private http: HttpClient) {}
  user: UserModel = {
    id: '1',
    username: 'teste',
    password: 'teste',
  };

  login(params: { username: string; password: string }): Observable<UserModel> {
    // return this.http
    //     .post<UserEntity>('https://example.com/login', {params})
    //     .pipe(map(this.userMapper.mapFrom));
    return of(this.user);
  }
  register(params: { phoneNum: string; password: string }): Observable<UserModel> {
    return this.http.post<UserEntity>('https://example.com/register', { params }).pipe(map(this.userMapper.mapFrom));
  }
  getUserProfile(): Observable<UserModel> {
    // return this.http.get<UserEntity>('https://example.com/user').pipe(
    //     map(this.userMapper.mapFrom));
    return of(this.user);
  }
}
