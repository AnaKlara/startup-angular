import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ButtonToggleComponent } from './components/button-toggle/button-toggle.component';
import { FooterComponent } from './components/footer/footer.component';
import { SuportCardComponent } from './components/header/components/suport-card/suport-card.component';
import { UserProfileCardComponent } from './components/header/components/user-profile-card/user-profile-card.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { PanelComponent } from './components/panel/panel.component';
import { SelectComponent } from './components/select/select.component';
import { DropdownSidenavComponent } from './components/sidenav/components/dropdown-sidenav/dropdown-sidenav.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { UnauthorizedPageComponent } from './components/unauthorized-page/unauthorized-page.component';
import { CustomMatPaginatorIntl } from './config/am-paginator-config';
import { registerCustomIcons } from './config/register-custom-icons';
import { PositionBelowDirective } from './directives/position-bellow-directive/position-bellow-directive.directive';
import { RestrictSpecialCharsDirective } from './directives/restrict-especial-chars/restrict-especial-chars.directive';
import { TooltipDirective } from './directives/tooltip/tooltip.directive';
import { BoldFirstWordPipe } from './pipes/bold-first-word/bold-first-word.pipe';
import { NameAbreviationPipe } from './pipes/name-abreviation/name-abreviation.pipe';
import { PeriodicidadePipe } from './pipes/periodicidade/periodicidade.pipe';
import { TipoPerfilPipe } from './pipes/tipo-perfil/tipo-perfil.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    SelectComponent,
    SidenavComponent,
    TooltipDirective,
    PanelComponent,
    LoadingOverlayComponent,
    UserProfileCardComponent,
    NameAbreviationPipe,
    DropdownSidenavComponent,
    SuportCardComponent,
    RestrictSpecialCharsDirective,
    PositionBelowDirective,
    ButtonToggleComponent,
    NotFoundPageComponent,
    UnauthorizedPageComponent,
    TipoPerfilPipe,
    PeriodicidadePipe,
    BoldFirstWordPipe,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    SelectComponent,
    SidenavComponent,
    TooltipDirective,
    PanelComponent,
    UserProfileCardComponent,
    LoadingOverlayComponent,
    MatIconModule,
    RestrictSpecialCharsDirective,
    PositionBelowDirective,
    ButtonToggleComponent,
    NotFoundPageComponent,
    UnauthorizedPageComponent,
    NameAbreviationPipe,
    TipoPerfilPipe,
    PeriodicidadePipe,
    BoldFirstWordPipe,
    // coloque aqui os componentes que serao usados em outros modulos
    // no modulo importe o SharedModule para ter acesso
  ],
  imports: [
    CommonModule,
    RouterModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatFormFieldModule,
  ],
  providers: [MatIconRegistry, { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }],
})
export class SharedModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    registerCustomIcons(matIconRegistry, domSanitizer);
  }
}
