import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { TooltipComponent } from './tooltip.component';

describe('TooltipComponent', () => {
  let component: TooltipComponent;
  let fixture: ComponentFixture<TooltipComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TooltipComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the tooltip', async(() => {
    const fixture = TestBed.createComponent(TooltipComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should create com valores de input', async(() => {
    const text = 'Tooltip Text';
    const left = 40;
    const top = 4;

    const fixture = TestBed.createComponent(TooltipComponent);
    component = fixture.componentInstance;
    component.text = text;
    component.left = left;
    component.top = top;
    fixture.detectChanges();

    expect(component.text).toBe(text);
    expect(component.left).toBe(left);
    expect(component.top).toBe(top);
  }));
});
