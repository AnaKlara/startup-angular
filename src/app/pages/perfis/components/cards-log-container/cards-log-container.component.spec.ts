import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';

import { CardsLogContainerComponent } from './cards-log-container.component';

describe('CardsLogContainerComponent', () => {
  let component: CardsLogContainerComponent;
  let fixture: ComponentFixture<CardsLogContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardsLogContainerComponent],
      imports: [MatIconModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CardsLogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
