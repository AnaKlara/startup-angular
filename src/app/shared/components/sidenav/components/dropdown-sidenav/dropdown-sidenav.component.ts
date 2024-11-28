import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { dropdownSidenav } from './dropdown-sidenav.model';

@Component({
  selector: 'app-dropdown-sidenav',
  templateUrl: './dropdown-sidenav.component.html',
  styleUrl: './dropdown-sidenav.component.scss',
})
export class DropdownSidenavComponent {
  @Input({ required: true }) dropdown: dropdownSidenav;
  @Output() closeSidenav = new EventEmitter<string>();
  dropdownOpen = false;

  constructor(
    private router: Router,
    private elementRef: ElementRef,
  ) {}

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    // console.log('foi clicado');
  }

  navigateTo(pagename: string): void {
    this.router.navigateByUrl(pagename);
    this.closeSidenav.emit();
  }

  @HostListener('document:mousedown', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }
}
