import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateRangeValidator(maxDays: number): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const start = formGroup.get('dataInicio')?.value;
    const end = formGroup.get('dataFim')?.value;

    const dataInicial = new Date(start);
    const dataFinal = new Date(end);

    if (dataInicial && dataFinal) {
      const diffInMs = new Date(dataFinal).getTime() - new Date(dataInicial).getTime();
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      return diffInDays > maxDays ? { dateRangeExceeded: true } : null;
    }

    if (!dataInicial && !dataFinal) {
      return null;
    }

    return null;
  };
}
