
import { TituloPipe } from './titulo-pipe';

describe('TituloPipe', () => {
  const pipe = new TituloPipe();

  it('transforma o texto em formato de título', () => {
    expect(pipe.transform('FESTIVAL DE MÚSICA'))
      .toBe('Festival de Música');
  });

  it('mantém palavras de ligação em minúsculo', () => {
    expect(pipe.transform('CASA DE FESTAS PARA EVENTOS'))
      .toBe('Casa de Festas para Eventos');
  });

  it('converte a primeira palavra para maiúscula', () => {
    expect(pipe.transform('de volta para casa'))
      .toBe('De Volta para Casa');
  });

  it('remove espaços excedentes', () => {
    expect(pipe.transform('  festa   de   aniversário  '))
      .toBe('Festa de Aniversário');
  });

  it('retorna vazio quando recebe valor nulo ou vazio', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform('')).toBe('');
    expect(pipe.transform('   ')).toBe('');
  });
});
