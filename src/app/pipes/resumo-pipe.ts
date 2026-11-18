import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resumo',
  standalone: true
})
export class ResumoPipe implements PipeTransform {
  transform(valor: string | null | undefined, limite = 30): string {
    const texto = valor?.trim() ?? '';
    if (!texto) return '';

    const tamanho = Number.isFinite(limite) ? Math.max(1, Math.floor(limite)) : 30;
    if (texto.length <= tamanho) return texto;

    const trecho = texto.slice(0, tamanho);
    const ultimoEspaco = trecho.lastIndexOf(' ');
    const corte = ultimoEspaco > 0 ? trecho.slice(0, ultimoEspaco) : trecho;

    return `${corte.trimEnd()}…`;
  }
}
