import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export function registerCustomIcons(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
  const iconPath = '../../../assets/icons/';
  matIconRegistry.addSvgIcon('action', domSanitizer.bypassSecurityTrustResourceUrl(`${iconPath}/action.svg`));
  matIconRegistry.addSvgIcon('arrows', domSanitizer.bypassSecurityTrustResourceUrl(`${iconPath}/arrows-up-down.svg`));
  matIconRegistry.addSvgIcon(
    'user-avatar',
    domSanitizer.bypassSecurityTrustResourceUrl(`${iconPath}/user-avatar-filled-alt.svg`),
  );
  matIconRegistry.addSvgIcon('filter', domSanitizer.bypassSecurityTrustResourceUrl(`${iconPath}/filter.svg`));
  // Adicione mais ícones conforme necessário

  // para usar os ícones customizados importe o shared module no módulo de destino e
  // use <mat-icon svgIcon="custom_icon_name"></mat-icon> no template

  // use icones personalizados caso não encontre um icone na lista de icones padrao do angular material, que pode ser verificada em:
  // https://jossef.github.io/material-design-icons-iconfont/
}
