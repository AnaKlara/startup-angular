import { Component, Input } from '@angular/core';
import {
  RequestListaFormularioResumoModel,
  ResponsePageOfListaFormularioResumoModel,
} from 'src/app/core/models/formulario-resumo.model';

@Component({
  selector: 'resultado-consulta',
  templateUrl: './resultado-consulta.component.html',
  styleUrl: './resultado-consulta.component.scss',
})
export class ResultadoConsultaComponent {
  @Input({ required: true }) PageOfListaFormularioResumo: ResponsePageOfListaFormularioResumoModel;
  @Input({ required: true }) FiltroListaFormularioResumo: RequestListaFormularioResumoModel;
}
