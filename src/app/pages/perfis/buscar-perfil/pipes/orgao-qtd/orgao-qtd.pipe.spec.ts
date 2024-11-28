import { TestBed } from '@angular/core/testing';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { OrgaoQtdPipe } from './orgao-qtd.pipe';

describe('OrgaoQtdPipe', () => {
  let pipe: OrgaoQtdPipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    const mockSanitizer = {
      bypassSecurityTrustHtml: jest.fn((html: string) => html as SafeHtml),
    };

    TestBed.configureTestingModule({
      providers: [{ provide: DomSanitizer, useValue: mockSanitizer }],
    });

    sanitizer = TestBed.inject(DomSanitizer);
    pipe = new OrgaoQtdPipe(sanitizer);
  });

  it('should return sanitized HTML with the first word bold', () => {
    const value = 'Orgao 123 Test';

    const result = pipe.transform(value);

    expect(sanitizer.bypassSecurityTrustHtml).toHaveBeenCalled();
    expect(result).toContain('<p style="display: inline-block; font-weight: 700;">Orgao</p>');
    expect(result).toContain('<p style="display: inline-block; margin-left: 0.25rem;"> 123 Test</p>');
  });

  it('should return the same value if null or undefined', () => {
    const result = pipe.transform(null as any);

    expect(result).toBeNull();
  });

  it('should return the same value if an empty string is passed', () => {
    const result = pipe.transform('');

    expect(result).toBe('');
  });
});
