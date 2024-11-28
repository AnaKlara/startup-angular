import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { jest } from '@jest/globals';
import { ToastrService } from 'ngx-toastr';

import { UploadableAreaComponent } from './uploadable-area.component';

describe('UploadableAreaComponent', () => {
  let component: UploadableAreaComponent;
  let fixture: ComponentFixture<UploadableAreaComponent>;
  let toastrServiceSpy: jest.Mocked<ToastrService>;

  beforeEach(async () => {
    toastrServiceSpy = {
      warning: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      declarations: [UploadableAreaComponent],
      imports: [ReactiveFormsModule, MatIconModule],
      providers: [{ provide: ToastrService, useValue: toastrServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadableAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set anexos value in writeValue', () => {
    const value = ['file1.jpg', 'file2.png'];
    component.writeValue(value);

    expect(component.anexos.value).toEqual(value);
  });

  it('should register onChange callback', () => {
    const onChange = jest.fn();
    component.registerOnChange(onChange);

    const newValue = ['file1.jpg'];
    component.anexos.setValue(newValue);

    expect(onChange).toHaveBeenCalledWith(newValue);
  });

  it('should register onTouched callback', () => {
    const onTouched = jest.fn();
    component.registerOnTouched(onTouched);

    component.onTouched();

    expect(onTouched).toHaveBeenCalled();
  });
});
