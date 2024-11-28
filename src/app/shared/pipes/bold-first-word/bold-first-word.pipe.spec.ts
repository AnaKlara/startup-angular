import { TestBed } from '@angular/core/testing';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

import { BoldFirstWordPipe } from './bold-first-word.pipe';

describe('BoldFirstWordPipe', () => {
  let pipe: BoldFirstWordPipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule],
    });

    sanitizer = TestBed.inject(DomSanitizer);
    pipe = new BoldFirstWordPipe(sanitizer);
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the value if it is falsy', () => {
    expect(pipe.transform('')).toBe('');
    expect(pipe.transform(null as any)).toBe(null);
    expect(pipe.transform(undefined as any)).toBe(undefined);
  });

  it('should bold the first word and return sanitized HTML', () => {
    const transformedValue = pipe.transform('Hello world!') as any;

    const expectedValue = sanitizer.bypassSecurityTrustHtml(
      `<p style="display: inline-block; font-weight: 700;">Hello</p><p style="display: inline-block; margin-left: 0.25rem;"> world!</p>`,
    );

    expect(transformedValue).toEqual(expectedValue);
  });
});
