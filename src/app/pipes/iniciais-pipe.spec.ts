import { IniciaisPipe } from './iniciais-pipe';

describe('IniciaisPipe', () => {
  const pipe = new IniciaisPipe();

  it('retorna as iniciais do primeiro e do último nome', () => {
    expect(pipe.transform('João Silva')).toBe('JS');
  });

  it('ignora espaços excedentes e nomes intermediários', () => {
    expect(pipe.transform('  Maria   de Souza  ')).toBe('MS');
  });

  it('retorna uma inicial quando existe apenas uma palavra', () => {
    expect(pipe.transform('Ana')).toBe('A');
  });

  it('retorna vazio quando recebe somente espaços', () => {
    expect(pipe.transform('   ')).toBe('');
  });
});
