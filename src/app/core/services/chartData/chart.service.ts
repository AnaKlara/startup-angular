import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChartDataModel } from '../../models/chart-data.model';
import { ChartDataMapper } from './mappers/chart-data.mapper';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  chartDataMapper = new ChartDataMapper();

  constructor(private http: HttpClient) {}

  data: ChartDataModel[] = [
    {
      group: 'Dataset 1',
      date: '2019-01-01T02:00:00.000Z',
      value: 0,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-06T02:00:00.000Z',
      value: -37312,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-08T02:00:00.000Z',
      value: -22392,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-15T02:00:00.000Z',
      value: -52576,
    },
    {
      group: 'Dataset 1',
      date: '2019-01-19T02:00:00.000Z',
      value: 20135,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-01T02:00:00.000Z',
      value: 47263,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-05T02:00:00.000Z',
      value: 14178,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-08T02:00:00.000Z',
      value: 23094,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-13T02:00:00.000Z',
      value: 45281,
    },
    {
      group: 'Dataset 2',
      date: '2019-01-19T02:00:00.000Z',
      value: -63954,
    },
  ];

  getChartData(): Observable<ChartDataModel[]> {
    // return this.http.get<ConcessoesEntity>(`${environment.apiUrl}/concessoes`).pipe(
    //     map(this.concessoesMapper.mapFrom));
    return of(this.data);
  }
}
