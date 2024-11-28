import { Component, Input } from '@angular/core';
import { LogModel } from 'src/app/core/models/perfil-log.model';

@Component({
  selector: 'cards-log-container',
  templateUrl: './cards-log-container.component.html',
  styleUrl: './cards-log-container.component.scss',
})
export class CardsLogContainerComponent {
  @Input({ required: true }) listaDelogsUsuario: LogModel[];
}
