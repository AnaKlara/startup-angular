import { TestBed } from '@angular/core/testing';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { SolicitacaoQtdPipe } from './solicitacao-qtd.pipe';

describe('SolicitacaoQtdPipe', () => {
  let pipe: SolicitacaoQtdPipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    const mockSanitizer = {
      bypassSecurityTrustHtml: jest.fn((html: string) => html as SafeHtml),
    };

    TestBed.configureTestingModule({
      providers: [{ provide: DomSanitizer, useValue: mockSanitizer }],
    });
    sanitizer = TestBed.inject(DomSanitizer);
    pipe = new SolicitacaoQtdPipe(sanitizer);
  });

  it('should return a single solicitacao wrapped in a styled p tag', () => {
    const value = ['Solicitacao 1'];
    const result = pipe.transform(value) as string;
    expect(result).toContain('<p style="display: inline-block');
    expect(result).toContain('Solicitacao 1</p>');
  });

  it('should return two solicitacoes wrapped in styled p tags', () => {
    const value = ['Solicitacao 1', 'Solicitacao 2'];
    const result = pipe.transform(value) as string;
    expect(result).toContain('<p style="display: inline-block');
    expect(result).toContain('Solicitacao 1</p>');
    expect(result).toContain('Solicitacao 2</p>');
  });

  it('should return two solicitacoes and +X if there are more than two solicitacoes', () => {
    const value = ['Solicitacao 1', 'Solicitacao 2', 'Solicitacao 3'];
    const result = pipe.transform(value) as string;
    expect(result).toContain('<p style="display: inline-block');
    expect(result).toContain('Solicitacao 1</p>');
    expect(result).toContain('Solicitacao 2</p>');
    expect(result).toContain('+1</p>');
  });
});
