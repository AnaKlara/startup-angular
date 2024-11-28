import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HomeComponent,
        {
          provide: Router,
          useValue: {
            navigateByUrl: jest.fn(), // Mock navigateByUrl method
          },
        },
      ],
    });

    component = TestBed.inject(HomeComponent);
    router = TestBed.inject(Router);
  });

  it('should redirect to the correct path when redirectTo is called', () => {
    const pagename = 'testPage';
    const expectedPath = 'pages/' + pagename;

    component.redirectTo(pagename);

    expect(router.navigateByUrl).toHaveBeenCalledWith(expectedPath);
  });
});
