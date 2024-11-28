<h1 style="color:SteelBlue;text-align: center;font-weight: bold"> Startup for Angular Projects</h1>

<p align="center">

<a href="https://v17.angular.io/docs/">
  <img alt="Static Badge" src="https://img.shields.io/badge/Angular%2017%20-%20v17.3.4%20-%20gray?logo=angular&logoColor=white&labelColor=firebrick">
</a>&nbsp;
<a href="https://sass-lang.com/">
  <img alt="Static Badge" src="https://img.shields.io/badge/Sass%20-%20v1.77.8%20-%20gray?logo=sass&logoColor=white&labelColor=hotpink">
</a>&nbsp;
<a href="https://nodejs.org/pt">
<img alt="Static Badge" src="https://img.shields.io/badge/Node.js%20-%2020.11.1%20-%20gray?logo=node.js">
</a>&nbsp;
<a href="https://code.visualstudio.com/">
<img src="https://custom-icon-badges.demolab.com/badge/Visual%20Studio%20Code-0078d7.svg?logo=vsc&logoColor=white" alt="VSCode version" />
</a>&nbsp;
<a href="https://www.typescriptlang.org/">
<img alt="Static Badge" src="https://img.shields.io/badge/Typescript%20-%205.4.5%20-%20gray?logo=typescript">
</a>&nbsp;
<a href="https://www.npmjs.com/">
<img alt="Static Badge" src="https://img.shields.io/badge/NPM%20-%2010.8.2%20-%20gray?logo=npm">
</a>&nbsp;
<a href="https://jestjs.io/pt-BR/">
  <img alt="Static Badge" src="https://img.shields.io/badge/Jest%20-%2029.7.0%20-%20gray?logo=jest&labelColor=yellow">
</a>
</p>

<h2 style="color:SteelBlue;font-weight: bold">Sobre o Projeto</h2>

Este projeto foi gerado com o Angular CLI versão 17 e Node.js versão 20.11.1. O projeto utiliza a biblioteca Angular Material para a construção das páginas e componentes, garantindo um design consistente e moderno.

Fique à vontade para explorar o projeto e adaptá-lo às suas necessidades específicas. Ele foi projetado para ser flexível e extensível, facilitando a adição de novos recursos e a personalização de acordo com os requisitos do seu projeto.

Esperamos que este projeto seja útil e contribua para o seu desenvolvimento em Angular. Em caso de dúvidas ou problemas, contate a equipe de arquitetura.

#### Configuração do Ambiente

1. Clone o repositório do projeto em sua máquina local:

```
git clone <URL_DO_REPOSITORIO>
```

2. Acesse o diretório do projeto:

```
cd <DIRETORIO_DO_PROJETO>
```

3. Instale as dependências do projeto:

```
npm install
```

#### Executando o Projeto

Para executar o projeto, siga as etapas abaixo:

1. Inicie o servidor de desenvolvimento:

```
ng serve --open
```

2. Abra o navegador e acesse a URL:
   http://localhost:4200

#### Estrutura do Projeto

O projeto segue uma estrutura de diretórios organizada, inspirada no modelo de Arquitetura Limpa.

A estrutura básica é a seguinte:

```
src/
├─ app/
│  ├─ pages/
│  │  ├─ pages
│  │  ├─ shared
│  ├─ shared/
│  │  ├─ base/
│  │  ├─ components/
│  │  ├─ config/
│  │  ├─ directives/
│  │  ├─ form-validators/
│  │  ├─ guards/
│  │  ├─ interceptors/
│  │  ├─ interfaces/
│  │  ├─ pipes/
│  │  ├─ services/
│  ├─ core/
│  │  ├─ guards/
│  │  ├─ models/
│  │  ├─ services/
├─ assets/
│  ├─ fonts/
│  ├─ icons/
│  ├─ img/
│  ├─ styles/
├─ environments/
│  ├─ environments.ts


```

<h2  style="color:SteelBlue;font-weight: bold">Desenvolvimento</h2 >

<h3  style="color:BurlyWood;font-weight: bold">Ferramentas DEV: extensões & vscode</h3 >

Deixamos algumas recomendações de extensões para o editor de código vscode. Caso não receba uma notificação automática pode-se instalar manualmente as configurações de extensões recomendadas:

Abra a paleta de comandos:

```
CMD + Shift + p
```

Pesquise por 'Show Recommended Extensions'.

Todas as extensões podem ser instaladas juntas ou apenas as extensões que você escolher.

<h3  style="color:BurlyWood;font-weight: bold">Ferramentas DEV: Lint & Prettier</h3>

Prettier e ESLint são duas ferramentas populares usadas em conjunto para manter a qualidade do código em projetos de desenvolvimento. Embora ambos ajudem a melhorar o código, eles têm propósitos distintos:

<h4>Prettier: Formatação de Código</h4>

Prettier é uma ferramenta de formatação de código automática. Ele aplica regras consistentes de estilo de código, como indentação, espaçamento, quebras de linha, etc.
Benefícios:

- Consistência: Garante que o código seja formatado de maneira consistente em todo o projeto, independentemente de quem está escrevendo o código.
- Facilidade de Uso: Ao configurar o Prettier, você pode formatar automaticamente o código ao salvar arquivos, eliminando a necessidade de discutir ou decidir sobre o estilo de código.

<h4>ESLint: Análise de Código (Linting)</h4>

ESLint é uma ferramenta de análise de código que ajuda a encontrar e corrigir problemas no código, como erros de sintaxe, práticas de programação incorretas e possíveis bugs. Benefícios:

- Qualidade do Código: Ajuda a identificar e corrigir problemas antes de rodar ou implantar o código.
  & Conformidade com Boas Práticas: Garante que o código siga boas práticas de desenvolvimento, como evitar o uso de variáveis não utilizadas ou funções assíncronas sem tratamento de erro.
- Personalização: Permite configurar regras específicas de acordo com os padrões e necessidades do seu projeto.

<h4>Utilização</h4>

Fazer uma varredura no projeto para encontrar erros de formatação:

```
npm run format
```

.

Fazer uma varredura no projeto para encontrar problemas de código:

```
npm run lint
```

.

Fazer uma varredura no projeto para ajustar automaticamente problemas de código não graves:

```
npm run lint:fix
```

<h3  style="color:BurlyWood;font-weight: bold">Estilos & organização</h3 >

Criamos e organizamos estilos globais para o projeto. Eles estão localizados na pasta: `src/assets/styles`. Lá também estão reunidos estilos e configurações para a utilização adequada do angular material e outras bibliotecas de terceiros. É possível alterar as confgurações globalmente e utilizá-las em qualquer lugar do projeto, bastando apenas importar o arquivo de estilos `styles.scss` na raíz do projeto.

Existem três temas de cores a esclher: yellow, green e ocean. O padrão é yellow.

<h3  style="color:BurlyWood;font-weight: bold">Gerando e Utilizando Componentes</h3 >

Para gerar um novo componente, execute o seguinte comando no terminal:

```
ng generate component nome-do-componente
```

Isso criará automaticamente os arquivos necessários para o componente, incluindo o arquivo .ts, .html, .scss e .spec.ts (para testes).

Após gerar o componente, você pode utilizá-lo em outras partes do projeto. Para fazer isso, siga as etapas abaixo:

1. Importe o componente no módulo em que deseja utilizá-lo. Por exemplo, se deseja utilizar o componente em um módulo chamado meu-modulo, abra o arquivo meu-modulo.module.ts e importe o componente da seguinte maneira:

```
import { MeuComponenteComponent } from '../caminho-do-componente/meu-componente.component';
```

2. Adicione o componente ao array declarations do módulo. Isso permitirá que o Angular reconheça e renderize o componente corretamente:

```
declarations: [
  // ... outros componentes ...
  MeuComponenteComponent,
]
```

3. Agora você pode utilizar o componente em qualquer template do módulo. Por exemplo, se deseja utilizar o componente em um template chamado meu-template.component.html, basta adicionar a tag do componente da seguinte maneira:

```
<app-meu-componente></app-meu-componente>
```

<h3  style="color:BurlyWood;font-weight: bold">Utilizando o Angular Material</h3 >

O Angular Material é uma biblioteca de componentes UI que segue as diretrizes de design chamadas Material Design da Google. Este projeto já está configurado para integrar e usar componentes do Angular Material. Para utilizar:

1. Importe os módulos de componentes Angular Material no seu módulo principal

```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
// Importe outros módulos conforme necessário

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    // Adicione outros módulos conforme necessário
  ],
  // Outras declarações e exports do módulo
})
export class SeuModulo { }
```

2. Agora você pode utilizar os componentes Angular Material em seus templates HTML. Por exemplo, se deseja usar o componente de botão (Button) e o componente de input (Input) em um componente chamado MeuComponente, adicione o seguinte código ao template HTML:

```
<button mat-button>Meu Botão</button>
<button mat-button [matMenuTriggerFor]="menu">Menu</button>
<mat-menu #menu="matMenu">
  <button mat-menu-item>Item 1</button>
  <button mat-menu-item>Item 2</button>
  <button mat-menu-item>Item 3</button>
</mat-menu>

```

<h2  style="color:SteelBlue;font-weight: bold">Testes com Jest</h2>

O desenvolvimento de testes é fundamental por várias razões. Aqui estão algumas das principais:

- Garantia de Qualidade: Testes ajudam a garantir que o código funciona como esperado e atende aos requisitos. Isso é crucial para identificar bugs e problemas antes que eles cheguem ao ambiente de produção.

- Detecção de Regresso: Testes automatizados permitem detectar regressões, ou seja, falhas introduzidas em partes do código que anteriormente funcionavam corretamente. Jest facilita a execução contínua de testes para garantir que alterações no código não introduzam novos problemas.

- Documentação Viva: Testes servem como uma forma de documentação que demonstra como as funções e componentes devem se comportar. Isso pode ser útil para novos desenvolvedores na equipe e para futuras manutenções.

Jest é uma biblioteca de testes para JavaScript que se destaca por várias razões.

### Principais comandos

Para executar os testes desenvolvidos:

```
npm run test
```

.
.
Para executar os testes desenvolvidos observando mudanças executando novamente os arquivos relevantes quando forem alterados:

```
npm run test:watch
```

.
.
Para executar os testes desenvolvidos e gerar um relatório de cobertura:

```
npm run test:coverage
```

Após executar o comando navegue para a pasta a seguir e acesse o arquivo index.html no seu navegador.

```
coverage/
├─ Icov-report/
│  ├─ index.html
```

Você irá encontrar um relatório como no exemplo abaixo:

```
File                    | % Stmts | % Branch | % Funcs | % Lines |
---------------------------------------------------------------
All files               |   85.00 |   78.00  |   90.00 |   83.00 |
 src/
   app.js                |   92.00 |   85.00  |   95.00 |   90.00 |
   utils.js              |   72.00 |   60.00  |   80.00 |   70.00 |

```

Neste exemplo:

- app.js tem uma alta cobertura, sugerindo que a maioria do código está bem testada.
- utils.js tem uma cobertura menor, indicando que mais testes podem ser necessários para esse arquivo.

O relatório normalmente mostra quatro principais métricas de cobertura:

- Linhas (Line Coverage): Percentual de linhas de código que foram executadas durante os testes. Uma cobertura alta de linhas significa que a maioria do código foi testada.

- Funções (Function Coverage): Percentual de funções ou métodos que foram chamados durante os testes. Uma boa cobertura de funções garante que todas as funções tenham sido testadas.

- Branches (Branch Coverage): Percentual de ramificações (condições) dentro de estruturas de controle (if, switch, etc.) que foram executadas. A cobertura de branches é importante para garantir que todas as possibilidades lógicas tenham sido testadas.

- Statements (Statement Coverage): Percentual de declarações que foram executadas. Isso é um pouco mais granular que a cobertura de linhas, pois avalia cada declaração individualmente.

Com essas informações, você pode ajustar sua estratégia de testes para cobrir melhor as áreas menos testadas e garantir uma base de código mais robusta e confiável.

<h2  style="color:SteelBlue;font-weight: bold">Referências</h2>

Node.js 20.x ou superior:
https://nodejs.org/

Angular 17.x:
https://v17.angular.io/docs/

Documentação oficial do Angular Material:
https://v17.material.angular.io/

Documentação oficial do Angular:
https://angular.io/tutorial

Lista de ícones do Material Design:
https://fonts.google.com/icons
