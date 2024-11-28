import { OrgaoPerfilEntity } from './perfil-resumo.entity';

export interface SolicitacaoResumoEntity {
  // Para a tabela
  codigo: string;
  chave: string;
  nome: string;
  lotacao: string;
  orgaos: OrgaoPerfilEntity[];
  solicitacoes: string[];
}

export interface ResponsePaginaDeListaDeSolicitacoesResumidas {
  listaSolicitacoesResumidas: SolicitacaoResumoEntity[];
  filters: {
    search: string;
    perfilSede: boolean;
    tipoPerfil?: string[];
    lotacao?;
    orgao?;
    formulario?;
  };
  orderBy: string;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number;
  previousPage?: number;
}

export interface RequestPaginaDeListaDeSolicitacoesResumoEntity {
  paginated: boolean;
  page: number;
  pageSize: number;
  filters: {
    search: string;
    perfilSede: boolean;
    tipoPerfil?: string[];
    lotacao?;
    orgao?;
    formulario?;
  };
  orderBy: string;
}
