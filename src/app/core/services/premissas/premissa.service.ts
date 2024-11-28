import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PremissaModel } from '../../models/premissa.model';
import { PremissaMapper } from './mappers/premissa.mapper';

@Injectable({
  providedIn: 'root',
})
export class PremissaService {
  premissaMapper = new PremissaMapper();

  constructor(private http: HttpClient) {}

  premissas: PremissaModel[] = [
    {
      id: '1',
      name: 'Project Alpha',
      version: '1.0',
      type: 'Software',
      associate: 'Team A',
      cycle: 5,
      description: 'A cutting-edge software project for streamlining business operations.',
    },
    {
      id: '2',
      name: 'Product Beta',
      version: '2.3',
      type: 'Hardware',
      associate: 'Team B',
      cycle: 8,
      description: 'An innovative hardware product with advanced features and improved performance.',
    },
    {
      id: '3',
      name: 'System Gamma',
      version: '3.1',
      type: 'Integrated System',
      associate: 'Team C',
      cycle: 6,
      description: 'A comprehensive integrated system designed to enhance overall efficiency and functionality.',
    },
    {
      id: '4',
      name: 'Service Delta',
      version: '1.5',
      type: 'Service Package',
      associate: 'Team D',
      cycle: 7,
      description: 'A service package offering tailored solutions to meet client needs and exceed expectations.',
    },
    {
      id: '5',
      name: 'App Epsilon',
      version: '4.2',
      type: 'Mobile Application',
      associate: 'Team E',
      cycle: 9,
      description: 'A user-friendly mobile application designed to provide seamless experiences on various devices.',
    },
    {
      id: '6',
      name: 'Tool Zeta',
      version: '2.1',
      type: 'Toolset',
      associate: 'Team F',
      cycle: 4,
      description: 'An advanced toolset equipped with features to optimize workflow and boost productivity.',
    },
    {
      id: '7',
      name: 'Platform Eta',
      version: '5.0',
      type: 'Platform',
      associate: 'Team G',
      cycle: 6,
      description: 'A robust platform supporting diverse applications and services for various industries.',
    },
    {
      id: '8',
      name: 'Protocol Theta',
      version: '1.2',
      type: 'Communication Protocol',
      associate: 'Team H',
      cycle: 5,
      description: 'A reliable communication protocol ensuring secure and efficient data exchange.',
    },
    {
      id: '9',
      name: 'Framework Iota',
      version: '3.5',
      type: 'Development Framework',
      associate: 'Team I',
      cycle: 8,
      description: 'A versatile development framework providing a foundation for creating scalable applications.',
    },
    {
      id: '10',
      name: 'Module Kappa',
      version: '2.8',
      type: 'Software Module',
      associate: 'Team J',
      cycle: 7,
      description: 'A specialized software module designed to enhance specific functionalities within a larger system.',
    },
  ];

  getAll(): Observable<PremissaModel[]> {
    // return this.http.get<PremissasEntity>(`${environment.apiUrl}/premissas`).pipe(
    //     map(this.premissasMapper.mapFrom));
    return of(this.premissas);
  }
}
