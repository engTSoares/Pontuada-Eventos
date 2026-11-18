import { ResumoPipe } from './resumo-pipe';

describe('ResumoPipe', () => {
  const pipe = new ResumoPipe();

  it('usa 30 caracteres por padrão e não corta palavras', () => {
    expect(pipe.transform('Semana de Tecnologia da Unijorge com palestras e oficinas'))
      .toBe('Semana de Tecnologia da…');
  });

  it('aplica o limite de 40 caracteres sem partir a palavra', () => {
    expect(pipe.transform('Semana de Tecnologia da Unijorge com palestras e oficinas', 40))
      .toBe('Semana de Tecnologia da Unijorge com…');
  });

  it('aceita limite personalizado', () => {
    expect(pipe.transform('Uma semana inteira de tecnologia e inovação', 16))
      .toBe('Uma semana…');
  });

  it('não adiciona reticências quando o texto cabe no limite', () => {
    expect(pipe.transform('Evento')).toBe('Evento');
  });

  it('retorna vazio para texto vazio ou somente espaços', () => {
    expect(pipe.transform('')).toBe('');
    expect(pipe.transform('   ')).toBe('');
  });
});
