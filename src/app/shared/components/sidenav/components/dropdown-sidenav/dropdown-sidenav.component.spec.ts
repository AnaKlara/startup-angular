import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DropdownSidenavComponent } from './dropdown-sidenav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('DropdownSidenavComponent', () => {
  let component: DropdownSidenavComponent;
  let fixture: ComponentFixture<DropdownSidenavComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownSidenavComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownSidenavComponent);
    component = fixture.componentInstance;
    component.dropdown = mockDropdown;
    fixture.detectChanges();
  });

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(DropdownSidenavComponent);
    const app = fixture.componentInstance;
    app.dropdown = mockDropdown;
    expect(app).toBeTruthy();
    fixture.detectChanges();
    expect(component.dropdownOpen).toBeFalsy();
  }));

  it('toggleDropdown works', () => {
    component.toggleDropdown();
    expect(component.dropdownOpen).toBeTruthy();
  });

  it('navigateTo works', () => {
    const spy = jest.spyOn(router, 'navigateByUrl');
    const spy1 = jest.spyOn(component.closeSidenav, 'emit');
    component.navigateTo('homePage');
    expect(spy).toHaveBeenCalledWith('homePage');
    expect(spy1).toHaveBeenCalledTimes(1);
  });

  it('onClick works', () => {
    const event = new MouseEvent('mousedown');
    component.onClick(event);
    expect(component.dropdownOpen).toBeFalsy();
  });
});

const mockDropdown = {
  title: 'Dropdown',
  icon: 'exit',
  link: 'login',
  itens: [
    {
      title: 'Item',
      link: 'item',
    },
  ],
};
