import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrl: './button-toggle.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ButtonToggleComponent),
      multi: true,
    },
  ],
})
export class ButtonToggleComponent implements ControlValueAccessor {
  isActive = false;

  @Input({ required: true }) label: string;

  toggle(): void {
    this.isActive = !this.isActive;
    this.onChange(this.isActive);
    this.onTouched();
  }

  onChange = (value: boolean) => {};
  onTouched = () => {};

  writeValue(value: boolean): void {
    this.isActive = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
