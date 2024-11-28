import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SelectOption } from './select-option.model';

@Component({
  selector: 'br-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnDestroy, OnInit {
  @Input({ required: true }) options: SelectOption[] = [];
  @Input() label: string | null = null;
  @Input() formControlName: string = '';

  @Output() selectChange = new EventEmitter<string>();

  isOpen = false;
  selectedOption: SelectOption | null = null;

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: SelectOption) {
    this.selectedOption = option;
    this.selectChange.emit(this.selectedOption.value);
    this.isOpen = false;
  }

  // To close the dropdown when clicking outside
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.select-wrapper')) {
      this.isOpen = false;
    }
  }

  // Add event listener when component is initialized
  ngOnInit() {
    document.addEventListener('click', this.onDocumentClick.bind(this));
  }

  // Clean up event listener when component is destroyed
  ngOnDestroy() {
    document.removeEventListener('click', this.onDocumentClick.bind(this));
  }
}
