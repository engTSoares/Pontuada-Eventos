import { MascaraEmailPipe } from './mascara-email-pipe';

describe('MascaraEmailPipe', () => {
  const pipe = new MascaraEmailPipe();

  it('mantém as duas primeiras letras, mascara o restante e preserva o domínio', () => {
    expect(pipe.transform('joaosilva@gmail.com')).toBe('jo*******@gmail.com');
  });

  it('preserva o e-mail quando o usuário possui somente duas letras', () => {
    expect(pipe.transform('jo@gmail.com')).toBe('jo@gmail.com');
  });

  it('retorna o valor original quando o e-mail não tem formato reconhecível', () => {
    expect(pipe.transform('email-invalido')).toBe('email-invalido');
  });

  it('retorna vazio para valor vazio', () => {
    expect(pipe.transform('')).toBe('');
    expect(pipe.transform(null)).toBe('');
  });
});
