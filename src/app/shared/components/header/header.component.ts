import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  dadosUsuario = {
    nome: 'Ana CLara Corrrea da Silva',
    chave: 'ID12345678',
    email: 'claracorreadasilva@gmail.com',
  };

  triggerEventToUserFloatCard: Subject<void> = new Subject<void>();

  triggerEventToSuportCard: Subject<void> = new Subject<void>();

  constructor(private router: Router) {}

  helpButtonClick() {}
  notificationButtonClick() {}

  toggleFloatingDiv() {
    this.triggerEventToUserFloatCard.next();
  }
  redirectTo(pagename: string): void {
    void this.router.navigateByUrl(pagename);
  }

  suportButtonClick() {
    this.triggerEventToSuportCard.next();
  }
}
