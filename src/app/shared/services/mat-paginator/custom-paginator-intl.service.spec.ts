import { CustomPaginatorIntl } from './custom-paginator-intl.service';

describe('CustomPaginatorIntl', () => {
  let paginatorIntl: CustomPaginatorIntl;

  beforeEach(() => {
    paginatorIntl = new CustomPaginatorIntl();
  });

  it('should create an instance', () => {
    expect(paginatorIntl).toBeTruthy();
  });

  it('should have correct itemsPerPageLabel', () => {
    expect(paginatorIntl.itemsPerPageLabel).toEqual('Itens por página');
  });

  it('should have correct nextPageLabel', () => {
    expect(paginatorIntl.nextPageLabel).toEqual('Próxima página');
  });

  it('should have correct previousPageLabel', () => {
    expect(paginatorIntl.previousPageLabel).toEqual('Página anterior');
  });

  it('should have correct firstPageLabel', () => {
    expect(paginatorIntl.firstPageLabel).toEqual('Primeira página');
  });

  it('should have correct lastPageLabel', () => {
    expect(paginatorIntl.lastPageLabel).toEqual('Última página');
  });
});
