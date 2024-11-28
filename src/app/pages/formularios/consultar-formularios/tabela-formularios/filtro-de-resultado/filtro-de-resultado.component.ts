import { Component } from '@angular/core';
interface Select {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'filtro-de-resultado',
  templateUrl: './filtro-de-resultado.component.html',
  styleUrl: './filtro-de-resultado.component.scss',
})
export class FiltroDeResultadoComponent {
  selectedFoodValue: string;
  selectedFood: string;
  foods: Select[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  selectedCarValue: string;
  selectedCar: string;
  cars: Select[] = [
    { value: 'volvo', viewValue: 'Volvo' },
    { value: 'saab', viewValue: 'Saab' },
    { value: 'mercedes', viewValue: 'Mercedes' },
  ];

  selectedOrgaoValue: string;
  selectedOrgao: string;
  orgaos: Select[] = [
    { value: 'volvo', viewValue: 'UN-GO' },
    { value: 'saab', viewValue: 'UN-PB' },
    { value: 'mercedes', viewValue: 'UN-MA' },
  ];

  selectedSituacaoValue: string;
  selectedSituacao: string;
  situacoes: Select[] = [
    { value: 'volvo', viewValue: 'Entregue' },
    { value: 'saab', viewValue: 'Pendente' },
    { value: 'mercedes', viewValue: 'Em edição' },
  ];

  selectedPocoValue: string;
  selectedPoco: string;
  pocos: Select[] = [
    { value: 'volvo', viewValue: '1-Q-B7-BA' },
    { value: 'saab', viewValue: '2-Q-B6-RJ' },
    { value: 'mercedes', viewValue: '8-Q-B1-MA' },
  ];
}
