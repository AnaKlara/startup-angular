import { SolicitacaoResumoEntity } from '../entities/solicitacao.entity';

export const listaSolicitacoesResumidos: SolicitacaoResumoEntity[] = [
  {
    codigo: '123',
    chave: 'PF7B',
    nome: 'Fabricio Augusto Fernandes Abreu',
    lotacao: 'GPP-E&P/EAEP/ICSP',
    orgaos: [
      {
        codigo: '123',
        nome: 'Todos',
      },
    ],
    solicitacoes: [
      'Alteração de tipo de perfil',
      'Adicionar formulário JHCT',
      'Alterar notificações',
      'Alterar Ativo x',
      'Alterar ativo y',
    ],
  },
  {
    codigo: '456',
    chave: 'PF7B',
    nome: 'Fabricio Augusto Fernandes Abreu',
    lotacao: 'GPP-E&P/EAEP/ICSP',
    orgaos: [
      {
        codigo: '456',
        nome: 'Todos',
      },
    ],
    solicitacoes: ['Alterar notificações'],
  },
];
