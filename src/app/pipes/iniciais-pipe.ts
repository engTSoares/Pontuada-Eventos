import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iniciais',
  standalone: true
})
export class IniciaisPipe implements PipeTransform {
  transform(valor: string): string {
    const palavras = valor.trim().split(/\s+/).filter(Boolean);

    if (palavras.length === 0) {
      return '';
    }

    const primeiraInicial = palavras[0].charAt(0);
    const ultimaInicial = palavras.length > 1
      ? palavras[palavras.length - 1].charAt(0)
      : '';

    return `${primeiraInicial}${ultimaInicial}`.toLocaleUpperCase('pt-BR');
  }
}
