import { TestBed } from '@angular/core/testing';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormularioPerfil } from 'src/app/core/models/perfil.model';

import { FormularioQtdPipe } from './formulario-qtd.pipe';

describe('FormularioQtdPipe', () => {
  let pipe: FormularioQtdPipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    // Create a mock for DomSanitizer
    const mockSanitizer = {
      bypassSecurityTrustHtml: jest.fn((html: string) => html as SafeHtml),
    };

    TestBed.configureTestingModule({
      providers: [{ provide: DomSanitizer, useValue: mockSanitizer }],
    });
    sanitizer = TestBed.inject(DomSanitizer);
    pipe = new FormularioQtdPipe(sanitizer);
  });

  it('should return sanitized HTML with three profiles', () => {
    const profiles: FormularioPerfil[] = [
      { nome: 'Perfil 1', codigo: '123' },
      { nome: 'Perfil 2', codigo: '223' },
      { nome: 'Perfil 3', codigo: '323' },
    ];

    const result = pipe.transform(profiles);
    expect(sanitizer.bypassSecurityTrustHtml).toHaveBeenCalled();
    expect(result).toContain('Perfil 1');
    expect(result).toContain('Perfil 2');
    expect(result).toContain('Perfil 3');
  });

  it('should return sanitized HTML with three profiles and "+1" for the rest', () => {
    const profiles: FormularioPerfil[] = [
      { nome: 'Perfil 1', codigo: '123' },
      { nome: 'Perfil 2', codigo: '223' },
      { nome: 'Perfil 3', codigo: '323' },
      { nome: 'Perfil 4', codigo: '423' },
    ];

    const result = pipe.transform(profiles);
    expect(sanitizer.bypassSecurityTrustHtml).toHaveBeenCalled();
    expect(result).toContain('Perfil 1');
    expect(result).toContain('Perfil 2');
    expect(result).toContain('Perfil 3');
    expect(result).toContain('+1');
  });

  it('should return the same value if null or undefined', () => {
    const result = pipe.transform(null as any);
    expect(result).toBeNull();
  });
});
