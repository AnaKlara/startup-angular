import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { of } from 'rxjs';
import { CheckpointService } from 'src/app/core/services/checkpoint/checkpoint.service';
import { CheckpointPageComponent } from './checkpoint-page.component';

describe('CheckpointPageComponent', () => {
  let component: CheckpointPageComponent;
  let fixture: ComponentFixture<CheckpointPageComponent>;
  let checkpointService: { getAll: jest.Mock };

  beforeEach(async(() => {
    checkpointService = { getAll: jest.fn(() => of({})) };
    TestBed.configureTestingModule({
      declarations: [CheckpointPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [MatMenuModule],
      providers: [{ provide: CheckpointService, useValue: checkpointService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckpointPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getCheckpointData works', () => {
    jest.spyOn(checkpointService, 'getAll').mockReturnValue(of([]));
    component.getCheckpointData();
    expect(component.dataSource.data).toStrictEqual([]);
    expect(checkpointService.getAll).toHaveBeenCalled();
  });

  it('applyFilter works', () => {
    const event = { target: { value: 'Filtro' } } as unknown as Event;
    const firstPage = jest.fn(() => {});
    component.dataSource.paginator = { firstPage: firstPage } as unknown as MatPaginator;
    component.applyFilter(event);
    expect(component.dataSource.filter).toBe('filtro');
    expect(firstPage).toHaveBeenCalled();
  });
});
