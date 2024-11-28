export interface PerfilResumoEntity {
  // Para a tabela
  codigo: string;
  chave: string;
  nome: string;
  lotacao: string;
  orgaos: OrgaoPerfilEntity[];
  formularios: FormularioPerfilEntity[];
  tiposPerfis: TipoPerfilEntity[]; // remover
}

export interface RequestPaginaDeListaDePerfisResumoEntity {
  paginated: boolean;
  page: number;
  pageSize: number;
  orderBy: string;
  filters: {
    search: string;
    perfilSede: boolean;
    tipoPerfil?: string[];
    lotacao?;
    orgao?;
    formulario?;
  };
}

export interface ResponsePaginaDeListaDePerfisResumoEntity {
  listaPerfisResumidos: PerfilResumoEntity[];
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

export interface OrgaoPerfilEntity {
  codigo: string;
  nome: string;
}

export interface FormularioPerfilEntity {
  codigo: string;
  nome: string;
}

export interface TipoPerfilEntity {
  codigo: string;
  nome: string;
}
