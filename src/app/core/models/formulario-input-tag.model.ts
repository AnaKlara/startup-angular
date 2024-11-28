export type tagName =
  | 'nomeFormulario'
  | 'nomeArquivo'
  | 'situacaoArquivo'
  | 'orgaoResponsavel'
  | 'gerenciaResponsavel'
  | 'chaveUsuario'
  | 'conteudoXML'
  | 'campo'
  | 'poco'
  | 'instalacao'
  | 'licenca'
  | '';

export interface tagSelecionada {
  tagName: tagName;
  tagNameView: string;
}

export const tagsList: tagSelecionada[] = [
  {
    tagName: 'nomeFormulario',
    tagNameView: 'Nome do Formulário',
  },
  {
    tagName: 'nomeArquivo',
    tagNameView: 'Nome do Arquivo',
  },
  {
    tagName: 'situacaoArquivo',
    tagNameView: 'Situação do arquivo',
  },
  {
    tagName: 'orgaoResponsavel',
    tagNameView: 'Órgão responsável',
  },
  {
    tagName: 'gerenciaResponsavel',
    tagNameView: 'Gerência responsável',
  },
  {
    tagName: 'chaveUsuario',
    tagNameView: 'Chave usuário',
  },
  {
    tagName: 'conteudoXML',
    tagNameView: 'Conteúdo do xml',
  },
  {
    tagName: 'campo',
    tagNameView: 'Campo',
  },
  {
    tagName: 'poco',
    tagNameView: 'Poço',
  },
  {
    tagName: 'instalacao',
    tagNameView: 'Instalação',
  },
  {
    tagName: 'licenca',
    tagNameView: 'Licença',
  },
];
