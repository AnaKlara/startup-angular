import { Component, ElementRef, HostListener } from '@angular/core';

import { menuItensMock } from './menuItensMock';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  isOpen: boolean = false;
  menuItems = menuItensMock;

  constructor(private elementRef: ElementRef) {}

  toggleSidenav() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:mousedown', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
