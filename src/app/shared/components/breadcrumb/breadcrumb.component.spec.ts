import { TestBed } from '@angular/core/testing';
import { BreadcrumbComponent } from './breadcrumb.component';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreadcrumbComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set breadcrumbs when breadcrumbs input property is set', () => {
    component.breadcrumbs = [
      { label: 'Breadcrumb 1', url: 'Breadcrumb 2' },
      { label: 'Breadcrumb 2', url: 'Breadcrumb 2' },
    ];
    expect(component.breadcrumbs).toEqual([
      { label: 'Breadcrumb 1', url: 'Breadcrumb 2' },
      { label: 'Breadcrumb 2', url: 'Breadcrumb 2' },
    ]);
  });

  it('should not set breadcrumbs if breadcrumbs input property is not set', () => {
    expect(component.breadcrumbs).toBeUndefined();
  });
});
