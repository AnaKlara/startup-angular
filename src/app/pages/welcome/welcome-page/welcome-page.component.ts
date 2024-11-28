import { Component } from '@angular/core';
import { Breadcrumb } from 'src/app/shared/components/breadcrumb/breadcrumb.model';
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent {
  items: any[] = [
    {
      title: 'Título 1',
      description: 'Descrição de uma ação que um usuário pode executar e não deve exceder 3 linhas.',
    },
    {
      title: 'Título 2',
      description: 'Descrição de uma ação que um usuário pode executar e não deve exceder 3 linhas.',
    },
  ];

  breadcrumbs: Breadcrumb[] = [
    { label: 'Home', url: '/home' },
    { label: 'Bem Vindo', url: '/' },
  ];

  longText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
}
