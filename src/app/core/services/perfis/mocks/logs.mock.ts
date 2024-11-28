import { LogModel } from 'src/app/core/models/perfil-log.model';

export const logsMock: LogModel[] = [
  {
    codigo: 'sadadsfhhh',
    chaveUsuarioQueFezAlteracao: 'FHF1',
    nomeUsuarioQueFezAlteracao: 'Ana Clara Correa da Silva',
    dataHora: new Date(),
    operacoes: [
      {
        codigo: '001',
        descricao: 'Criou o perfil',
      },
      {
        codigo: '002',
        descricao: 'Incluiu acesso aos formulários.',
        formularios: ['GDTF', 'GDTF', 'GDTF', 'GDTF'],
      },
    ],
    justificativa: 'Solicitação do RT Rodrigo Rodrigues',
  },
  {
    codigo: 'sadadsfhhh',
    chaveUsuarioQueFezAlteracao: 'FHF1',
    nomeUsuarioQueFezAlteracao: 'Ana Clara Correa da Silva',
    dataHora: new Date(),
    operacoes: [
      {
        codigo: '003',
        descricao: 'Alterou acesso aos formulários.',
        formularios: ['GDTF', 'GDTF', 'GDTF', 'GDTF'],
      },
    ],
    justificativa: 'Solicitação do RT Rodrigo Rodrigues',
    anexos: [
      {
        nome: 'comprovante de autorizacao.pdf',
        url: 'http://dowload.arquivo.com.br/comprovante-de-autorizacao.pdf',
      },
      {
        nome: 'comprovante de autorizacao.pdf',
        url: 'http://dowload.arquivo.com.br/comprovante-de-autorizacao.pdf',
      },
    ],
  },

  {
    codigo: 'hakunaMatata',
    chaveUsuarioQueFezAlteracao: 'FHF1',
    nomeUsuarioQueFezAlteracao: 'Ana Clara Correa da Silva',
    dataHora: new Date(),
    operacoes: [
      {
        codigo: '003',
        descricao: 'Alterou acesso aos formulários.',
        formularios: ['GDTF', 'GDTF', 'GDTF', 'GDTF'],
      },
    ],
    justificativa: 'Solicitação do RT Rodrigo Rodrigues',
    anexos: [
      {
        nome: 'comprovante de autorizacao.pdf',
        url: 'http://dowload.arquivo.com.br/comprovante-de-autorizacao.pdf',
      },
      {
        nome: 'comprovante de autorizacao.pdf',
        url: 'http://dowload.arquivo.com.br/comprovante-de-autorizacao.pdf',
      },
    ],
  },

  {
    codigo: 'sadadsfhhh',
    chaveUsuarioQueFezAlteracao: 'FHF1',
    nomeUsuarioQueFezAlteracao: 'Ana Clara Correa da Silva',
    dataHora: new Date(),
    operacoes: [
      {
        codigo: '003',
        descricao: 'Alterou acesso aos formulários.',
        formularios: ['GDTF', 'GDTF', 'GDTF', 'GDTF'],
      },
    ],
    justificativa: 'Solicitação do RT Rodrigo Rodrigues',
    anexos: [
      {
        nome: 'comprovante de autorizacao.pdf',
        url: 'http://dowload.arquivo.com.br/comprovante-de-autorizacao.pdf',
      },
      {
        nome: 'comprovante de autorizacao.pdf',
        url: 'http://dowload.arquivo.com.br/comprovante-de-autorizacao.pdf',
      },
    ],
  },
];
