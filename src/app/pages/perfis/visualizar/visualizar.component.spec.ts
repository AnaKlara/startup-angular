import { NgZone } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { logsMock } from 'src/app/core/services/perfis/mocks/logs.mock';
import { PerfisService } from 'src/app/core/services/perfis/perfis.service';
import { LoadingOverlayService } from 'src/app/shared/services/loading-overlay/loading-overlay.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { CardsLogContainerComponent } from '../components/cards-log-container/cards-log-container.component';
import { FloatContainerComponent } from '../components/float-container/float-container.component';
import { VisualizarComponent } from './visualizar.component';

describe('VisualizarComponent', () => {
  let component: VisualizarComponent;
  let fixture: ComponentFixture<VisualizarComponent>;
  let toastrs: jest.Mocked<ToastrService>;
  let perfisService: jest.Mocked<PerfisService>;
  let loadingOverlay: jest.Mocked<LoadingOverlayService>;
  let dialog: jest.Mocked<MatDialog>;
  let ngZone: NgZone;
  let router: Router;

  beforeEach(async () => {
    toastrs = {
      success: jest.fn(),
      error: jest.fn(),
    } as unknown as jest.Mocked<ToastrService>;

    perfisService = {
      updateNotificacaoAtivo: jest.fn(),
      getLogsPerfil: jest.fn(),
      desativarPerfil: jest.fn(),
    } as unknown as jest.Mocked<PerfisService>;

    loadingOverlay = {
      setLoading: jest.fn(),
    } as unknown as jest.Mocked<LoadingOverlayService>;

    dialog = {
      open: jest.fn().mockReturnValue({
        componentInstance: {
          confirmarDesativarEE: { subscribe: jest.fn() },
        },
      }),
    } as unknown as jest.Mocked<MatDialog>;

    await TestBed.configureTestingModule({
      declarations: [VisualizarComponent, FloatContainerComponent, CardsLogContainerComponent],
      imports: [
        RouterTestingModule,
        MatTabsModule,
        MatMenuModule,
        MatSlideToggleModule,
        MatAutocompleteModule,
        SharedModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        { provide: ToastrService, useValue: toastrs },
        { provide: PerfisService, useValue: perfisService },
        { provide: LoadingOverlayService, useValue: loadingOverlay },
        { provide: MatDialog, useValue: dialog },
        provideAnimations(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarComponent);
    component = fixture.componentInstance;

    ngZone = TestBed.inject(NgZone);
    router = TestBed.inject(Router);

    jest.spyOn(router, 'navigateByUrl');

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateNotificacaoAtivo on toggle change', () => {
    const spy = jest.spyOn(perfisService, 'updateNotificacaoAtivo').mockReturnValue(of(true));
    const event = { checked: true } as MatSlideToggleChange;

    component.onToggleChange('123', event);

    expect(spy).toHaveBeenCalledWith('123', true);
    expect(toastrs.success).toHaveBeenCalledWith('Notificação atualizada.');
  });

  it('should navigate to edit page', () => {
    component.perfilUsuario = { chave: 'FHF1' } as any;
    ngZone.run(() => {
      component.redirectToEditar();
    });
    expect(router.navigateByUrl).toHaveBeenCalledWith('/perfis/FHF1/editar');
  });

  it('should show logs when the button is clicked', () => {
    component.perfilUsuario = { chave: '123' } as any;

    const spyGetLogs = jest.spyOn(perfisService, 'getLogsPerfil').mockReturnValue(of(logsMock));
    const spySetLoading = jest.spyOn(loadingOverlay, 'setLoading');
    const spyAbrirDivLateral = jest.spyOn(component, 'abrirDivLateral');

    component.visualizarLog();

    expect(spySetLoading).toHaveBeenCalledWith(true);
    expect(spyGetLogs).toHaveBeenCalledWith('123');
    expect(spySetLoading).toHaveBeenCalledWith(false);
    expect(spyAbrirDivLateral).toHaveBeenCalled();
    expect(component.listaDelogsUsuario).toEqual(logsMock);
  });
});
