import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConcessoesModel } from '../../models/concessoes.model';
import { ConcessoesMapper } from './mappers/concessoes.mapper';

@Injectable({
  providedIn: 'root',
})
export class ConcessoesService {
  concessoesMapper = new ConcessoesMapper();

  constructor(private http: HttpClient) {}

  concessoes: ConcessoesModel[] = [
    {
      sigla: 'BUZ',
      nome: 'Buzios',
      versao: 'Original',
      situacao: 'Enviado ANP',
      parecer: 'Aprovado',
    },
    {
      sigla: 'BUZ',
      nome: 'Buzios',
      versao: 'Revisão 5',
      situacao: 'Enviado ANP',
      parecer: 'Não aprovado',
    },
    {
      sigla: 'BUZ',
      nome: 'Buzios',
      versao: 'Revisão 5',
      situacao: 'Enviado ANP',
      parecer: 'Sem parecer',
    },
    {
      sigla: 'BUZ',
      nome: 'Buzios',
      versao: 'Revisão 5',
      situacao: 'Enviado ANP',
      parecer: 'Pendente',
    },
    {
      sigla: 'BUZ',
      nome: 'Buzios',
      versao: 'Revisão 5',
      situacao: 'Enviado ANP',
      parecer: 'Não aprovado',
    },
  ];

  getConcessoes(): Observable<ConcessoesModel[]> {
    // return this.http.get<ConcessoesEntity>(`${environment.apiUrl}/concessoes`).pipe(
    //     map(this.concessoesMapper.mapFrom));
    return of(this.concessoes);
  }
}
