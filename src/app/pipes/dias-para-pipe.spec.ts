import { DiasParaPipe } from './dias-para-pipe';

describe('DiasParaPipe', () => {
  const pipe = new DiasParaPipe();
  const hoje = new Date(2026, 10, 10);

  it('retorna Hoje quando a data é a mesma do dia de referência', () => {
    expect(pipe.transform('2026-11-10', hoje)).toBe('Hoje');
  });

  it('retorna Amanhã quando falta um dia', () => {
    expect(pipe.transform('2026-11-11', hoje)).toBe('Amanhã');
  });

  it('retorna a quantidade de dias restantes', () => {
    expect(pipe.transform('2026-11-20', hoje)).toBe('Faltam 10 dias');
  });

  it('calcula corretamente a diferença entre meses', () => {
    expect(pipe.transform('2026-12-01', hoje)).toBe('Faltam 21 dias');
  });

  it('retorna Encerrado para uma data anterior', () => {
    expect(pipe.transform('2026-11-09', hoje)).toBe('Encerrado');
  });

  it('retorna vazio quando recebe uma data vazia', () => {
    expect(pipe.transform('', hoje)).toBe('');
  });

  it('retorna vazio para uma data inexistente', () => {
    expect(pipe.transform('2026-02-30', hoje)).toBe('');
  });
});
