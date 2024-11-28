export interface LogModel {
  codigo: string;
  chaveUsuarioQueFezAlteracao: string;
  nomeUsuarioQueFezAlteracao: string;
  dataHora: Date;
  operacoes: Operacao[];
  justificativa: string;
  anexos?: Anexo[];
}

export interface Operacao {
  codigo: string;
  descricao: string;
  formularios?: string[];
}

export interface Anexo {
  nome: string;
  url: string;
}
