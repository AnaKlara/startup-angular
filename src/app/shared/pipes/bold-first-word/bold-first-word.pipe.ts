import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'boldFirstWord',
})
export class BoldFirstWordPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) return value;

    const firstSpaceIndex = value.indexOf(' ');

    const firstWord = value.slice(0, firstSpaceIndex);
    const restOfText = value.slice(firstSpaceIndex);

    return this.sanitizer.bypassSecurityTrustHtml(
      `<p style="display: inline-block; font-weight: 700;">${firstWord}</p><p style="display: inline-block; margin-left: 0.25rem;">${restOfText}</p>`,
    );
  }
}
