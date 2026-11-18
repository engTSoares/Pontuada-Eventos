
import { Pipe, PipeTransform } from '@angular/core';

const PALAVRAS_LIGACAO = new Set([
  'a', 'as', 'o', 'os', 'um', 'uma', 'uns', 'umas',
  'de', 'da', 'das', 'do', 'dos',
  'em', 'no', 'na', 'nos', 'nas',
  'por', 'para', 'com', 'e', 'ao', 'aos',
  'pela', 'pelas', 'pelo', 'pelos',
  'entre', 'sob', 'sobre'
]);

@Pipe({
  name: 'titulo',
  standalone: true
})
export class TituloPipe implements PipeTransform {

  transform(valor: string | null | undefined): string {
    if (valor == null || valor.trim() === '') {
      return '';
    }

    return valor.trim().split(/\s+/).map((palavra, indice) => {
      const minuscula = palavra.toLocaleLowerCase('pt-BR');

      if (indice > 0 && PALAVRAS_LIGACAO.has(minuscula)) {
        return minuscula;
      }

      const caracteres = Array.from(minuscula);
      const primeiraLetra = caracteres.shift();

      return primeiraLetra
        ? primeiraLetra.toLocaleUpperCase('pt-BR') + caracteres.join('')
        : '';
    }).join(' ');
  }
}
