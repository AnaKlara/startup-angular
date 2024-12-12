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

## Available Languages

- [Portuguese](README-pt-BR.md)

<h2 style="color:SteelBlue;font-weight: bold">About the Project</h2>

This project was generated with Angular CLI version 17 and Node.js version 20.11.1. It uses the Angular Material library for constructing pages and components, ensuring a consistent and modern design.

Feel free to explore the project and adapt it to your specific needs. It has been designed to be flexible and extensible, making it easy to add new features and customize according to the requirements of your project

#### Environment Setup

1. Clone the project repository to your local machine:

```
git clone <REPOSITORY_URL>
```

2. Navigate to the project directory:

```
cd <PROJECT_DIRECTORY>
```

3. Install the project dependencies:

```
npm install
```

#### Running the Project

To run the project, follow the steps below:

1. Start the development server:

```
ng serve --open
```

2. Open your browser and navigate to the URL: http://localhost:4200
   http://localhost:4200

#### Project Structure

The project follows an organized directory structure as follows:

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

<h2  style="color:SteelBlue;font-weight: bold">Development</h2 >

<h3  style="color:BurlyWood;font-weight: bold">DEV Tools: Extensions & VSCode</h3 >

Here are some recommended extensions for the VSCode code editor. If you don’t receive an automatic notification, you can manually install the recommended extension settings:

Open the command palette:

```
CMD + Shift + p
```

Search for 'Show Recommended Extensions'.

All extensions can be installed at once or only the ones you choose.

<h3  style="color:BurlyWood;font-weight: bold">DEV Tools: Lint & Prettier</h3>

Prettier and ESLint are two popular tools often used together to maintain code quality in development projects. While both help improve code, they serve different purposes:

<h4>Prettier: Code Formatting</h4>

Prettier is an automatic code formatting tool. It applies consistent code style rules like indentation, spacing, line breaks, etc. Benefits:

- Consistency: Ensures that code is formatted consistently across the project, regardless of who is writing the code.
- Ease of Use: Once Prettier is set up, it formats the code automatically on file save, eliminating the need for discussions about code style.

<h4>ESLint: Code Analysis (Linting)</h4>

ESLint is a code analysis tool that helps identify and fix issues in code, such as syntax errors, improper programming practices, and potential bugs. Benefits:

- Code Quality: Helps identify and fix issues before running or deploying the code.
- Best Practices Compliance: Ensures code follows good development practices, like avoiding unused variables or unhandled asynchronous functions.
- Customization: Allows configuring specific rules based on project standards and needs.

<h4>Usage</h4>

To scan the project for formatting issues:

```
npm run format
```

.

To scan the project for code issues:

```
npm run lint
```

.

To scan and automatically fix non-severe code issues:

```
npm run lint:fix
```

<h3  style="color:BurlyWood;font-weight: bold">Styles & Organization</h3 >

I created and organized global styles for the project, located in the src/assets/styles folder. Here, you’ll also find styles and configurations for proper use of Angular Material and other third-party libraries. You can change global settings and use them anywhere in the project by importing the styles.scss file in the root of the project.

There are three color themes to choose from: yellow, green, and ocean. The default is yellow.

<h3  style="color:BurlyWood;font-weight: bold">Generating and Using Components</h3 >

To generate a new component, run the following command in the terminal:

```
ng generate component nome-do-componente
```

This will automatically create the necessary files for the component, including the .ts, .html, .scss, and .spec.ts files (for tests).

After generating the component, you can use it in other parts of the project. Follow these steps:

1. Import the component into the module where you want to use it. For example, if you want to use the component in a module called my-module, open my-module.module.ts and import the component like this:

```
import { MeuComponenteComponent } from '../caminho-do-componente/meu-componente.component';
```

2. Add the component to the module's declarations array. This will allow Angular to recognize and render the component correctly:

```
declarations: [
  // ... outros componentes ...
  MeuComponenteComponent,
]
```

3. Now you can use the component in any template within the module. For example, if you want to use the component in a template called my-template.component.html, simply add the component tag like this:

```
<app-meu-componente></app-meu-componente>
```

<h3  style="color:BurlyWood;font-weight: bold">Using Angular Material</h3 >

Angular Material is a UI component library that follows Google's Material Design guidelines. This project is already set up to integrate and use Angular Material components. To use:

1. Import the necessary Angular Material component modules in your main module:

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

2. Now you can use Angular Material components in your HTML templates. For example, to use the button and input components in a component called MyComponent, add the following code to the HTML template:

```
<button mat-button>Meu Botão</button>
<button mat-button [matMenuTriggerFor]="menu">Menu</button>
<mat-menu #menu="matMenu">
  <button mat-menu-item>Item 1</button>
  <button mat-menu-item>Item 2</button>
  <button mat-menu-item>Item 3</button>
</mat-menu>

```

<h2  style="color:SteelBlue;font-weight: bold">Testing with Jest</h2>

Testing is crucial for several reasons. Here are the main ones:

- Quality Assurance: Tests ensure that the code works as expected and meets requirements, which is critical to identify bugs and issues before they reach production.
- Regression Detection: Automated tests help detect regressions—failures in parts of the code that previously worked fine. Jest makes it easy to run continuous tests to ensure changes in the code do not introduce new issues.
- Living Documentation: Tests serve as documentation demonstrating how functions and components should behave. This can be useful for new developers joining the team and for future maintenance.

Jest is a popular JavaScript testing library with several advantages.

### Main Commands

To run the tests:

```
npm run test
```

.
.
To run the tests and observe changes, executing relevant files when modified:

```
npm run test:watch
```

.
.
To run the tests and generate a coverage report:

```
npm run test:coverage
```

After running the command, navigate to the following folder and open the index.html file in your browser:

```
coverage/
├─ Icov-report/
│  ├─ index.html
```

You'll find a report like the one below:

```
File                    | % Stmts | % Branch | % Funcs | % Lines |
---------------------------------------------------------------
All files               |   85.00 |   78.00  |   90.00 |   83.00 |
 src/
   app.js                |   92.00 |   85.00  |   95.00 |   90.00 |
   utils.js              |   72.00 |   60.00  |   80.00 |   70.00 |

```

In this example:

- app.js has high coverage, suggesting that most of the code is well-tested.
- utils.js has lower coverage, indicating that more tests may be needed for that file.

The report typically shows four key coverage metrics:

- Lines (Line Coverage): The percentage of code lines executed during tests. High line coverage means most of the code has been tested.
- Functions (Function Coverage): The percentage of functions or methods called during tests. Good function coverage ensures all functions are tested.
- Branches (Branch Coverage): The percentage of branches (conditions) within control structures (if, switch, etc.) that were executed. Branch coverage is important to ensure all logical possibilities are tested.
- Statements (Statement Coverage): The percentage of statements executed. This is slightly more granular than line coverage, as it evaluates each individual statement.

With this information, you can adjust your testing strategy to better cover less-tested areas and ensure a more robust and reliable codebase.

<h2  style="color:SteelBlue;font-weight: bold">References</h2>

Node.js 20.x or higher:
https://nodejs.org/

Angular 17.x:
https://v17.angular.io/docs/

Official Angular Material Documentation:
https://v17.material.angular.io/

Official Angular Documentation:
https://angular.io/tutorial

Material Design Icons List:
https://fonts.google.com/icons
