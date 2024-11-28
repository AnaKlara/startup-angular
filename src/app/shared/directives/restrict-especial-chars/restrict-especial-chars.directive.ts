import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appRestrictSpecialChars]',
})
export class RestrictSpecialCharsDirective {
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const key = event.key;

    if (this.isSpecialChar(key)) {
      event.preventDefault();
    }
  }

  private isSpecialChar(char: string): boolean {
    const regex = /[^a-zA-Z0-9\s]/;
    return regex.test(char);
  }
}
