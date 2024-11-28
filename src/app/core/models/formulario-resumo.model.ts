export interface FormularioResumoModel {
  id: string;
  tipoDoFormulario: string;
  nomeDoArquivo: string;
  editorChave: string;
  orgao: string;
  dataCriacao: Date;
  dataEnvio: Date;
  situacaoArquivo: string;
  nomePoco: string;
  responsavel: string;
}

export interface RequestListaFormularioResumoModel {
  dataInicio: Date;
  dataFim: Date;
  dataCriacao: boolean;
  dataEnvio: boolean;
  tags: {
    nomeFormulario?: string | null;
    nomeArquivo?: string | null;
    situacaoArquivo?: string[] | null;
    orgaoResponsavel?: string[] | null;
    gerenciaResponsavel?: string[] | null;
    chaveUsuario?: string[] | null;
    conteudoXML?: string | null;
    campo?: string[] | null;
    poco?: string[] | null;
    instalacao?: string[] | null;
    licenca?: string[] | null;
  };
  page: number;
  pageSize: number;
}

export interface ResponsePageOfListaFormularioResumoModel {
  listaFormularios: FormularioResumoModel[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage?: number;
  previousPage?: number;
}

export interface FormularioAutocompleteModel {
  codigo: string;
  sigla: string;
  descricao: string;
}
