import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root',
})
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  itemsPerPageLabel = 'Itens por página';
  nextPageLabel = 'Próxima página';
  previousPageLabel = 'Página anterior';
  firstPageLabel = 'Primeira página';
  lastPageLabel = 'Última página';

  getRangeLabel = function (page: number, pageSize: number, length: number): string {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, return only the total length
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };
}
