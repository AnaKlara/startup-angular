import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UnitModel } from '../../models/unit.model';
import { UnitEntity } from './entities/unit-entity';
import { UnitMapper } from './mappers/unit.mapper';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  mapper = new UnitMapper();

  constructor(private http: HttpClient) {}
  getAll(): Observable<UnitModel[]> {
    return this.http
      .get<UnitEntity[]>(`${environment.apiUrl}/units?type=teste`)
      .pipe(map((entities: UnitEntity[]) => entities.map(this.mapper.mapFrom)));
  }
}
