import { TelefonePipe } from './telefone-pipe';

describe('TelefonePipe', () => {
  const pipe = new TelefonePipe();

  it('formata celular', () => {
    expect(pipe.transform('71988887777')).toBe('(71) 98888-7777');
  });

  it('formata telefone fixo', () => {
    expect(pipe.transform('7133334444')).toBe('(71) 3333-4444');
  });

  it('aceita telefone que já contém pontuação', () => {
    expect(pipe.transform('(71) 98888-7777')).toBe('(71) 98888-7777');
  });

  it('devolve o valor original quando não reconhece a quantidade de dígitos', () => {
    expect(pipe.transform('123')).toBe('123');
  });
});
