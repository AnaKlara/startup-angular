import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';
import { DropdownSidenavComponent } from './components/dropdown-sidenav/dropdown-sidenav.component';
import { SidenavComponent } from './sidenav.component';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidenavComponent, DropdownSidenavComponent],
    }).compileComponents();
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
