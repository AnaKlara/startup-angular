import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { of } from 'rxjs';
import { PremissaModel } from 'src/app/core/models/premissa.model';
import { PremissaService } from 'src/app/core/services/premissas/premissa.service';
import { PremissasPageComponent } from './premissas-page.component';

describe('PremissasPageComponent', () => {
  let component: PremissasPageComponent;
  let fixture: ComponentFixture<PremissasPageComponent>;
  let premissaService: { getAll: jest.Mock };

  beforeEach(async(() => {
    premissaService = { getAll: jest.fn(() => of(mockPremissaModel)) };
    TestBed.configureTestingModule({
      declarations: [PremissasPageComponent],
      imports: [MatMenuModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: PremissaService, useValue: premissaService }, MatDialog],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremissasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getCheckpointData works', () => {
    jest.spyOn(premissaService, 'getAll').mockReturnValue(of([mockPremissaModel]));
    component.getCheckpointData();
    expect(premissaService.getAll).toHaveBeenCalled();
    expect(component.dataSource.data).toStrictEqual([mockPremissaModel]);
  });

  it('applyFilter works', () => {
    const event = { target: { value: 'Filtro' } } as unknown as Event;
    component.applyFilter(event);
    expect(component.dataSource.filter).toBe('filtro');
  });

  it('openDialog works', () => {
    const spy = jest.spyOn(component.dialog, 'open');
    component.openDialog();
    expect(spy).toHaveBeenCalled();
  });
});

const mockPremissaModel: PremissaModel = {
  id: '',
  name: '',
  version: '',
  type: '',
  associate: '',
  cycle: 0,
  description: '',
};
