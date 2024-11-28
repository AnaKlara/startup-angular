import { PerfilEntity, Periodicidade, Status, TipoPerfil } from '../entities/perfil.entity';

export const perfilMock: PerfilEntity = {
  nome: 'Ana Clara Correa da Silva',
  lotacao: 'GPP-E&O/EAEP/ICSP',
  chave: 'FHF1',
  ativo: true,
  tipoPerfil: TipoPerfil.Administrador,
  perfilSede: true,
  permissoes: {
    orgaos: [
      {
        codigo: '001',
        nome: 'Todos',
        formularios: [
          {
            codigo: '123',
            sigla: 'RFAP',
            descricao: 'Nome completo do formulário por extenso para ajudar a identificar',
          },
          {
            codigo: '124',
            sigla: 'NCSB',
            descricao: 'Nome completo do formulário por extenso para ajudar a identificar',
          },
          {
            codigo: '126',
            sigla: 'RCP',
            descricao: 'Nome completo do formulário por extenso para ajudar a identificar',
          },
        ],
        tipoPerfil: TipoPerfil.Editor,
      },
    ],
    blocos: [
      {
        codigo: '001',
        nome: 'Circo voador',
        formularios: [
          {
            codigo: '123',
            sigla: 'RFAP',
            descricao: 'Nome completo do formulário por extenso para ajudar a identificar',
          },
          {
            codigo: '124',
            sigla: 'NCSB',
            descricao: 'Nome completo do formulário por extenso para ajudar a identificar',
          },
          {
            codigo: '126',
            sigla: 'RCP',
            descricao: 'Nome completo do formulário por extenso para ajudar a identificar',
          },
        ],
        tipoPerfil: TipoPerfil.Editor,
      },
    ],
    ativos: [
      {
        codigo: '004',
        nome: 'elfundal',
        formularios: [
          { codigo: '234', sigla: 'PDTG', descricao: 'Descrição completa' },
          { codigo: '235', sigla: 'QMBT', descricao: 'Descrição completa' },
          { codigo: '236', sigla: 'AKTE', descricao: 'Descrição completa' },
          { codigo: '237', sigla: 'LDFT', descricao: 'Descrição completa' },
          { codigo: '238', sigla: 'KVTB', descricao: 'Descrição completa' },
          { codigo: '239', sigla: 'LYXC', descricao: 'Descrição completa' },
          { codigo: '240', sigla: 'ATNL', descricao: 'Descrição completa' },
        ],
        tipoPerfil: TipoPerfil.Leitor,
      },
    ],
  },
  notificacoes: [
    {
      codigo: '123485',
      ativo: true,
      tipoFormulario: {
        codigo: '123',
        descricao: 'Nome completo do formulário por extenso',
        sigla: 'RFAP',
      },
      periodicidade: Periodicidade['Um Dia'],
      alarmEmail: true,
      alarmPopUp: true,
      status: [Status.Aguardando, Status.Atrasado],
      criadoPor: ['TYR7', 'FHF1'],
    },
    {
      codigo: '123489',
      ativo: false,
      tipoFormulario: {
        codigo: '126',
        descricao: 'Nome completo do formulário por extenso',
        sigla: 'CPCO',
      },
      periodicidade: Periodicidade['Uma Semana'],
      alarmEmail: true,
      alarmPopUp: true,
      status: [Status.Entregue],
      criadoPor: ['FHF1', 'MG6X'],
    },
  ],
};
