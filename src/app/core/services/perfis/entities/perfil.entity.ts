export interface PerfilEntity {
  nome: string;
  lotacao: string;
  chave: string;
  ativo: boolean;
  tipoPerfil: TipoPerfil;
  perfilSede: boolean;
  permissoes: Permissoes;
  notificacoes: Notificacao[] | null;
}

export interface Permissoes {
  orgaos?: OrgaoPermissao[] | null;
  blocos?: BlocoPermissao[] | null;
  ativos?: AtivoPermissao[] | null;
}

export interface OrgaoPermissao {
  codigo: string;
  nome: string;
  formularios: FormularioResumo[];
  tipoPerfil: TipoPerfil;
}
export interface BlocoPermissao {
  codigo: string;
  nome: string;
  formularios: FormularioResumo[];
  tipoPerfil: TipoPerfil;
}
export interface AtivoPermissao {
  codigo: string;
  nome: string;
  formularios: FormularioResumo[];
  tipoPerfil: TipoPerfil;
}

export interface FormularioResumo {
  codigo: string;
  sigla: string;
  descricao: string;
}
export interface Notificacao {
  codigo: string;
  ativo: boolean | null;
  tipoFormulario?: {
    codigo: string;
    descricao: string;
    sigla: string;
  } | null;
  periodicidade: Periodicidade;
  alarmEmail: boolean;
  alarmPopUp: boolean;
  status: string[];
  criadoPor: string[];
}

export enum TipoPerfil {
  Administrador = 'A',
  Leitor = 'L',
  Editor = 'E',
}

export enum Periodicidade {
  'Uma hora' = '1H',
  'Um Dia' = '1D',
  'Uma Semana' = '1S',
}

export enum Status {
  Atrasado = 'atrasado',
  Aguardando = 'Aguardando Análise',
  Entregue = 'Entregue',
}

export type StatusArray = Array<Status>;
