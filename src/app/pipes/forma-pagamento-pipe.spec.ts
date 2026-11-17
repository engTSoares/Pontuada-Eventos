import { FormaPagamentoPipe } from './forma-pagamento-pipe';

describe('FormaPagamentoPipe', () => {
  const pipe = new FormaPagamentoPipe();

  it('apresenta o rótulo para Pix', () => {
    expect(pipe.transform('Pix')).toBe('Pix');
  });

  it('apresenta o rótulo para Dinheiro', () => {
    expect(pipe.transform('Dinheiro')).toBe('Dinheiro');
  });

  it('apresenta o rótulo para Cartão de crédito', () => {
    expect(pipe.transform('Cartão de crédito')).toBe('Cartão de crédito');
  });

  it('apresenta o rótulo para Cartão de débito', () => {
    expect(pipe.transform('Cartão de débito')).toBe('Cartão de débito');
  });

  it('apresenta o rótulo para Transferência', () => {
    expect(pipe.transform('Transferência')).toBe('Transferência');
  });

  it('retorna Não informado para valor vazio', () => {
    expect(pipe.transform('')).toBe('Não informado');
  });
});
