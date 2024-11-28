export interface PerfilResumoModel {
  // Para a tabela
  codigo: string;
  chave: string;
  nome: string;
  lotacao: string;
  orgaos: OrgaoPerfil[];
  formularios: FormularioPerfil[];
  tiposPerfis: TipoPerfil[]; // remover
}

export interface OrgaoPerfil {
  codigo: string;
  nome: string;
}

export interface FormularioPerfil {
  codigo: string;
  nome: string; // TODO: change to sigla
}

export interface TipoPerfil {
  codigo: string;
  nome: string;
}
