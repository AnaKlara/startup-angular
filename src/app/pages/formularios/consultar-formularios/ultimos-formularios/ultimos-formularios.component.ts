import { Component } from '@angular/core';
import {
  RequestListaFormularioResumoModel,
  ResponsePageOfListaFormularioResumoModel,
} from 'src/app/core/models/formulario-resumo.model';
import { FormulariosService } from 'src/app/core/services/formulario/formularios.service';

@Component({
  selector: 'ultimos-formularios',
  templateUrl: './ultimos-formularios.component.html',
  styleUrl: './ultimos-formularios.component.scss',
})
export class UltimosFormulariosComponent {
  pageOfListaDeFormulariosEmEdicao: ResponsePageOfListaFormularioResumoModel;
  pageOfListaDeFormulariosEntregues: ResponsePageOfListaFormularioResumoModel;

  filtroFormulariosEmEdicao: RequestListaFormularioResumoModel = {
    dataInicio: new Date(new Date().getDate() - 14), // duas semanas atrás
    dataFim: new Date(),
    dataCriacao: true,
    dataEnvio: false,
    tags: {
      situacaoArquivo: ['edicao'],
    },
    page: 0,
    pageSize: 10,
  };

  filtroFormulariosEntregues: RequestListaFormularioResumoModel = {
    dataInicio: new Date(new Date().getDate() - 14), // duas semanas atrás
    dataFim: new Date(),
    dataCriacao: true,
    dataEnvio: false,
    tags: {
      situacaoArquivo: ['entregue'],
    },
    page: 0,
    pageSize: 10,
  };

  constructor(private formulariosService: FormulariosService) {
    this.buscarListaFormularios();
  }

  buscarListaFormularios() {
    this.formulariosService.getListaFormulariosResumo(this.filtroFormulariosEmEdicao).subscribe({
      next: (response) => {
        this.pageOfListaDeFormulariosEmEdicao = response;
      },
      complete: () => {},
      error: () => {},
    });

    this.formulariosService.getListaFormulariosResumo(this.filtroFormulariosEntregues).subscribe({
      next: (response) => {
        this.pageOfListaDeFormulariosEntregues = response;
      },
      complete: () => {},
      error: () => {},
    });
  }
}
