import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    component.options = [{ label: 'opcao1', value: 'opcao1' }];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggleOpen works', () => {
    component.isOpen = false;
    component.toggleOpen();
    expect(component.isOpen).toBeTruthy();
  });

  it('selectOption works', () => {
    const option = { label: 'option2', value: '' };
    const spy = jest.spyOn(component.selectChange, 'emit');
    component.selectOption(option);
    expect(component.selectedOption).toStrictEqual(option);
    expect(spy).toHaveBeenCalledWith(option.value);
    expect(component.isOpen).toBeFalsy();
  });

  it('onDocumentClick works', () => {
    const closest = jest.fn();
    const event = { target: { closest: closest } } as unknown as MouseEvent;
    component.onDocumentClick(event);
    expect(component.isOpen).toBeFalsy();
    expect(closest).toHaveBeenCalled();
  });

  it('ngOnDestroy works', () => {
    const spy = jest.spyOn(document, 'removeEventListener');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  it('ngOnInit works', () => {
    const spy = jest.spyOn(document, 'addEventListener');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
});
