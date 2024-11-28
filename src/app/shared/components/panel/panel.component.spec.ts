import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelComponent } from './panel.component';

describe('PanelComponent', () => {
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelComponent);
    component = fixture.componentInstance;
    component.title = 'titulo';
    component.subtitle = 'subtitulo';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit com error', () => {
    const fixture = TestBed.createComponent(PanelComponent);
    const component = fixture.componentInstance;
    component.title = undefined as unknown as string;
    component.subtitle = undefined as unknown as string;
    try {
      fixture.detectChanges();
    } catch (e: any) {
      expect(e.message).toBe('Title and Subtitle is required');
    }
  });
});
